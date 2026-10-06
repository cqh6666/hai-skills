const puppeteer = require('puppeteer-core');
const { findChrome } = require('./runtime.cjs');

async function main() {
    const executablePath = findChrome();
    if (!executablePath) throw new Error('Chrome not found; set PUPPETEER_EXECUTABLE_PATH.');
    const browser = await puppeteer.launch({ headless: true, executablePath });
    try {
        const page = await browser.newPage();
        await page.setContent('<main>Browser ready</main>');
        const text = await page.$eval('main', element => element.textContent);
        if (text !== 'Browser ready') throw new Error('Could not read browser content.');
        console.log(JSON.stringify({ browserReady: true, version: await browser.version() }));
    } finally {
        await browser.close();
    }
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
