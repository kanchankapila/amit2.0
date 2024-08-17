const chromium = require("@sparticuz/chromium");
const puppeteer = require('puppeteer-core');

chromium.setHeadlessMode = true; 
chromium.setGraphicsMode = false;

exports.handler = async function (event, context) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.goto("https://spacejelly.dev/");  

    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', element => element.content);

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "OK, Done!",
            page: {
                title,
                description
            }
        })
    };
}