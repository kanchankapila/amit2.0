import puppeteer from 'puppeteer-core';
import axios from 'axios';

const browserlessWSEndpoint = process.env.BROWSERLESS_WS_ENDPOINT;
const apiUrl = process.env.mongoapiurl;
const apiKey = process.env.mongoapikey;

export const handler = async function(event, context) {
  let browser = null;
  console.log('Running Netlify Function: trendlyne-cookie');
  try {
    const start = Date.now();
    browser = await puppeteer.connect({
      browserWSEndpoint: browserlessWSEndpoint,
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setCacheEnabled(true);

    const targetUrl = 'https://trendlyne.com/visitor/loginmodal/';
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    // Click Google login
    await page.waitForSelector('a.socialaccount_provider[title="Google"]', { visible: true });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('a.socialaccount_provider[title="Google"]'),
    ]);

    // Google login email
    await page.waitForSelector('input[type="email"]', { visible: true });
    await page.type('input[type="email"]', process.env.GOOGLE_EMAIL, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    // Google login password
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD, { delay: 100 });
    await page.keyboard.press('Enter');

    // Redirect back to Trendlyne
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    

    // Extract cookies
    const cookies = await page.cookies();
    let trnd = '';
    let csrf = '';
    for (let val of cookies) {
      if (val.name === '.trendlyne') trnd = val.value;
      if (val.name === 'csrftoken') csrf = val.value;
    }

    // Send to MongoDB or external API
    await axios.post(apiUrl + '/updateOne', {
      collection: 'cookie',
      database: 'Trendlynecookie',
      dataSource: 'Cluster0',
      filter: {},
      update: {
        $set: {
          csrf,
          trnd,
          time: start,
        },
      },
      upsert: true,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    });

    const timeTaken = Date.now() - start;
    console.log(`Login success in ${timeTaken} ms`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Google login success', csrf, trnd }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
