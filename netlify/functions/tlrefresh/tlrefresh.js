const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const { set } = require('@netlify/blobs');

exports.handler = async function (event, context) {
  let browser = null;

  try {
    console.log("Launching Chromium...");

    const executablePath = await chromium.executablePath;

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    console.log("Navigating to Trendlyne login page...");
    await page.goto('https://trendlyne.com/visitor/loginmodal/', {
      waitUntil: 'domcontentloaded',
    });

    // Fill login form
    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);

    // Click login button
    await page.click('form button[type="submit"]');
    await page.waitForTimeout(5000); // Wait for login/cookie setting

    const cookies = await page.cookies();
    console.log("Cookies received:", cookies);

    let trnd = '';
    let csrf = '';

    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });

    if (!trnd || !csrf) {
      throw new Error("Cookies missing or login failed.");
    }

    // ✅ Save to Netlify Blob storage
    await set('trendlyne/csrf', csrf);
    await set('trendlyne/trnd', trnd);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Cookies saved to Netlify Blob storage.',
        cookies: { trnd, csrf },
      }),
    };
  } catch (error) {
    console.error("Error:", error);
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
