const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
  let browser = null;

  try {
    // Launch headless Chrome with the appropriate configuration for Lambda
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://google.com', { waitUntil: 'networkidle2' });
    
    // Example: take a screenshot
    theTitle = await page.title();

    console.log('done on page', theTitle)

    await browser.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ theTitle }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};