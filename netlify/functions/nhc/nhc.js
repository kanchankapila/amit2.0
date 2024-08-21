const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer-core');

const axios = require('axios');
require('dotenv').config();

exports.handler = async function (event, context) {
  let browser = null;
  console.log('Spawning Chrome headless');

  try {
    const start = Date.now();

    // Launch Chrome using chrome-launcher
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    const puppeteerOptions = {
      browserURL: `http://127.0.0.1:${chrome.port}`, // Connect Puppeteer to the launched Chrome instance
    };

    // Connect Puppeteer to the running Chrome instance
    browser = await puppeteer.connect(puppeteerOptions);
    console.log('Spawning Chrome headless1');
    const page = await browser.newPage();

    // Open login page
    const targetUrl = 'https://trendlyne.com/visitor/loginmodal/';
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    console.log('Spawning Chrome headless2');
    // Input login credentials
    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    // await page.click('button[type="submit"]'); // Simulate login
    console.log('Spawning Chrome headless3');
    // Wait for login to complete
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    console.log('Spawning Chrome headless4');
    // Get cookies after login
    const cookies = await page.cookies();
    console.log(cookies)
    let trnd = '';
    let csrf = '';

    // Extract the necessary cookies
    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });

    console.log(`Trendlyne cookie: ${trnd}`);
    console.log(`CSRF token: ${csrf}`);

    // Store cookies and CSRF token via Axios (uncomment if necessary)
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
    //     }
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
