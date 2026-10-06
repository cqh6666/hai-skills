const fs = require('node:fs');
const path = require('node:path');

function findChrome() {
    return [
        process.env.PUPPETEER_EXECUTABLE_PATH,
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
        process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'),
        process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
        process.env['ProgramFiles(x86)'] && path.join(process.env['ProgramFiles(x86)'], 'Google/Chrome/Application/chrome.exe'),
    ].find(file => file && fs.existsSync(file));
}

function supportsNode(version = process.versions.node) {
    const [major, minor] = version.split('.').map(Number);
    return major > 22 || (major === 22 && minor >= 12);
}

module.exports = { findChrome, supportsNode };
