const assert = require('node:assert/strict');
const test = require('node:test');
const { EventEmitter } = require('node:events');
const https = require('node:https');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { searchWechatArticles, fetchArticleContent } = require('../scripts/search/search_wechat.js');

async function withResponses(responses, run) {
    const original = https.request;
    let count = 0;
    https.request = (_options, callback) => {
        const req = new EventEmitter();
        req.setTimeout = () => {};
        req.end = () => queueMicrotask(() => {
            const fixture = responses[Math.min(count++, responses.length - 1)];
            const res = new EventEmitter();
            res.statusCode = fixture.status;
            res.headers = fixture.headers || {};
            callback(res);
            res.emit('data', Buffer.from(fixture.html || ''));
            res.emit('end');
        });
        return req;
    };
    try { await run(() => count); } finally { https.request = original; }
}

test('Search distinguishes access failures, empty results and invalid counts', async () => {
    await withResponses([{ status: 200, html: '<div>请输入验证码</div>' }], async () => {
        await assert.rejects(searchWechatArticles('验证', 1), /验证|限制/);
    });
    await withResponses([{ status: 503, html: 'Unavailable' }], async () => {
        await assert.rejects(searchWechatArticles('网络', 1), /HTTP 503/);
    });
    await withResponses([{ status: 200, html: '<div>没有找到相关结果</div>' }], async () => {
        assert.deepEqual(await searchWechatArticles('无结果', 1), []);
    });
    await assert.rejects(searchWechatArticles('数量', -1), /正整数/);
});

test('Article retrieval follows ordinary redirects and stops at verification or another host', async () => {
    for (const [location, success, pattern] of [
        ['/s/final', true],
        ['/mp/wappoc_appmsgcaptcha', false, /验证/],
        ['https://example.com/unexpected', false, /其他站点/],
    ]) {
        await withResponses([
            { status: 302, headers: { location } },
            { status: 200, html: '<div id="js_content">正文</div>' },
        ], async count => {
            const result = await fetchArticleContent('https://mp.weixin.qq.com/s/article');
            assert.equal(result.success, success);
            if (success) assert.equal(result.content, '正文');
            else {
                assert.match(result.error, pattern);
                assert.equal(count(), 1);
            }
        });
    }
});

test('Downloader rejects unrelated hosts before launching Chrome', () => {
    const result = spawnSync(process.execPath, [path.join(__dirname, '../scripts/downloader/download.js'), 'https://example.com/article'], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /mp.weixin.qq.com/);
});
