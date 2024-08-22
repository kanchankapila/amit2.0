const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer');
const axios = require('axios');
require('dotenv').config();

exports.handler = async function (event, context) {
  let browser = null;
  console.log('Launching headless Chrome with @sparticuz/chromium');

  try {
    const start = Date.now();

    // Launch Puppeteer with @sparticuz/chromium
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(), // Use @sparticuz/chromium executable path
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Open login page
    const targetUrl = 'https://trendlyne.com/visitor/loginmodal/';
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    // Input login credentials
    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    // Uncomment below line if you want to simulate clicking login
    // await page.click('button[type="submit"]');

    // Wait for login to complete
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    // Get cookies after login
    const cookies = await page.cookies();
    let trnd = '';
    let csrf = '';

    // Extract the necessary cookies
    cookies.forEach((cookie) => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });

    console.log(`Trendlyne cookie: ${trnd}`);
    console.log(`CSRF token: ${csrf}`);

    // Optionally store cookies via Axios (uncomment if necessary)
    // await axios.post('https://your-mongodb-api-endpoint.com', {
    //   collection: 'cookie',
    //   database: 'Trendlynecookie',
    //   dataSource: 'Cluster0',
    //   filter: {},
    //   update: {
    //     $set: {
    //       csrf: csrf,
    //       trnd: trnd,
    //       time: start,
    //     },
    //   },
    //   upsert: true,
    // });

    const timeTaken = Date.now() - start;
    console.log(`Total time taken: ${timeTaken} milliseconds`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
        csrf,
        trnd,
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
