const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const fs = require('fs');

exports.handler = async function (event, context) {
  let browser = null;

  try {
    console.log("Starting Puppeteer...");

    // Get the executable path from @sparticuz/chromium
    const executablePath = await chromium.executablePath();
    console.log("Chromium executable path:", executablePath);

    // Launch Puppeteer with the specified Chromium binary
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    console.log("Navigating to Trendlyne...");

    // Navigate to the login page
    const targetUrl = 'https://trendlyne.com/visitor/loginmodal/';
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    console.log("Filling in login form...");

    // Fill in login form
    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);

    // Wait for the login to be processed and cookies to be set
    await page.waitForTimeout(3000); // Adjust this timeout as needed

    // Get cookies
    const cookies = await page.cookies();
    console.log("Cookies received:", cookies);

    let trnd = '';
    let csrf = '';

    // Extract the cookies
    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') {
        trnd = cookie.value;
        process.env.trnd = trnd;
      }
      if (cookie.name === 'csrftoken') {
        csrf = cookie.value;
        process.env.csrf = csrf;
      }
    });

    console.log("Trendlyne cookie:", trnd);
    console.log("CSRF token:", csrf);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
        cookies: { trnd, csrf },
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
