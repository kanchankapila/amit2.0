const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async function (event, context) {
  let browser = null;

  try {
    const { set } = await import('@netlify/blobs').then(mod => mod);

    const executablePath = await chromium.executablePath;

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto('https://trendlyne.com/visitor/loginmodal/', {
      waitUntil: 'domcontentloaded',
    });

    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    await page.click('form button[type="submit"]');
    await page.waitForTimeout(5000);

    const cookies = await page.cookies();

    let trnd = '', csrf = '';
    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });

    await set('trendlyne/trnd', trnd);
    await set('trendlyne/csrf', csrf);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cookies saved', trnd, csrf }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (browser) await browser.close();
  }
};
