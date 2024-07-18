const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const axios = require('axios');

exports.handler = async function(event, context) {
  let browser = null;
  console.log('spawning chrome headless');
  
  try {
    const start = Date.now();
    const executablePath = process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath;

    browser = await puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setCacheEnabled(true);

    const targetUrl = 'https://trendlyne.com/visitor/loginmodal/';
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    
    // Parallelize the extraction of cookies
    const [cookies] = await Promise.all([
      page.cookies()
    ]);

    let trnd = '';
    let csrf = '';

    for (let cookie of cookies) {
      if (cookie.name === '.trendlyne') {
        trnd = cookie.value;
      }
      if (cookie.name === 'csrftoken') {
        csrf = cookie.value;
      }
    }

    console.log(`Trendlyne cookie: ${trnd}`);
    console.log(`CSRF token: ${csrf}`);

    Parallelize the database operations
    await Promise.all([
      await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-lhekmvb/endpoint/data/v1/action', {
        collection: 'cookie',
        database: 'Trendlynecookie',
        dataSource: 'Cluster0',
        filter: {},
        update: {
          $set: {
            csrf: csrf,
            trnd: trnd,
            time: start
          }
        },
        upsert: true
      })
    ]);

    const timeTaken = Date.now() - start;
    console.log(`Total time taken: ${timeTaken} milliseconds`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Trendlyne cookie data updated successfully', timeTaken })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

