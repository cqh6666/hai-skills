const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { supportsNode } = require('../scripts/runtime.cjs');

test('Node version matches the browser dependency minimum', () => {
    for (const version of ['20.19.0', '22.0.0', '22.11.9']) assert.equal(supportsNode(version), false);
    for (const version of ['22.12.0', '22.20.0', '24.0.0', '26.7.0']) assert.equal(supportsNode(version), true);
});

test('Chrome discovery supports Windows install locations and a custom path', () => {
    const source = fs.readFileSync(path.join(__dirname, '../scripts/runtime.cjs'), 'utf8');
    const env = {
        PROGRAMFILES: 'C:\\Program Files',
        LOCALAPPDATA: 'C:\\Users\\Example User\\AppData\\Local',
        'ProgramFiles(x86)': 'C:\\Program Files (x86)',
    };
    function find(installed, extraEnv = {}) {
        const context = {
            module: { exports: {} },
            process: { env: { ...env, ...extraEnv } },
            require(name) {
                if (name === 'node:path') return path.win32;
                if (name === 'node:fs') return { existsSync: file => file === installed };
                throw new Error(`Unexpected module: ${name}`);
            },
        };
        vm.runInNewContext(source, context);
        return context.module.exports.findChrome();
    }
    for (const directory of Object.values(env)) {
        const chrome = path.win32.join(directory, 'Google/Chrome/Application/chrome.exe');
        assert.equal(find(chrome), chrome);
    }
    const custom = 'D:\\Browser Tools\\chrome.exe';
    assert.equal(find(custom, { PUPPETEER_EXECUTABLE_PATH: custom }), custom);
    assert.equal(find('missing'), undefined);
});
