const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const executablePath = await chromium.executablePath() || process.env.CHROME_PATH
module.exports = {
  handler: async () => {
    try {
      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });

      const page = await browser.newPage();

      await page.goto("https://www.google.com", { waitUntil: "networkidle0" });

      console.log("Chromium:", await browser.version());
      console.log("Page Title:", await page.title());

      await page.close();

      await browser.close();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};