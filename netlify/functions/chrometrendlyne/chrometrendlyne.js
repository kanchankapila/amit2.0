const puppeteer = require("puppeteer-core");
const chromium = require("chromium");


(async () => {
  let browser = null;
  console.log('Spawning Chrome headless');

  try {
    const start = Date.now();
    // const executablePath = await chromium.executablePath; // Ensure this is resolved

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setCacheEnabled(true);

    const targetUrl = 'https://trendlyne.com/visitor/loginmodal/';
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    
    const cookies = await page.cookies();

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

    // await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-lhekmvb/endpoint/data/v1/action', {
    //   collection: 'cookie',
    //   database: 'Trendlynecookie',
    //   dataSource: 'Cluster0',
    //   filter: {},
    //   update: {
    //     $set: {
    //       csrf: csrf,
    //       trnd: trnd,
    //       time: start
    //     }
    //   },
    //   upsert: true
    // });

    const timeTaken = Date.now() - start;
    console.log(`Total time taken: ${timeTaken} milliseconds`);

  } catch (error) {
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
