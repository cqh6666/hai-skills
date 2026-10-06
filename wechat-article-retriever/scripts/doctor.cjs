const { findChrome, supportsNode } = require('./runtime.cjs');
const result = {
    node: process.version,
    supportedNode: supportsNode(),
    chrome: findChrome() || null,
};
for (const name of ['cheerio', 'puppeteer-core']) {
    try {
        require.resolve(name);
        result[name] = 'ready';
    } catch {
        result[name] = 'missing';
    }
}
result.searchReady = result.supportedNode && result.cheerio === 'ready';
result.downloadReady = result.supportedNode && Boolean(result.chrome) && result['puppeteer-core'] === 'ready';
result.ready = result.searchReady && result.downloadReady;
console.log(JSON.stringify(result, null, 2));
if (!result.ready) process.exitCode = 1;
