const chromiumExecutable = require("@sparticuz/chromium");
const puppeteerCore = require("puppeteer-core");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);

const refreshTrendlyne = async (page) => {
  const targetUrl = "https://trendlyne.com/visitor/loginmodal/";
  await page.goto(targetUrl, {
    waitUntil: ["networkidle0"]
  });

  await page.type("#id_login", "amit.kapila.2009@gmail.com");
  await page.type("#id_password", process.env.TRENDLYNE_PASSWORD);

  const cookie = await page.cookies();
  console.log("cookie generated");
  console.log(cookie);
  process.env.csrf = cookie[4].value;
  process.env.trnd = cookie[3].value;

  await client.connect();
  const db = client.db("Trendlynecookie");
  const collection = db.collection("cookie");
  await collection.deleteMany();
  await collection.insertOne({ csrf: cookie[4].value, trnd: cookie[3].value });
  console.log("Trendlynerefresh function is hit!!!");
};

exports.handler = async (event) => {
  let browser = null;
  console.log("spawning chrome headless");
  try {
    let start = Date.now();
    const executablePath = process.env.CHROME_EXECUTABLE_PATH || (await chromiumExecutable.executablePath);

    browser = await puppeteerCore.launch({
      args: ["--no-sandbox", "--disable-extensions", "--single-process"],
      executablePath: executablePath,
      headless: chromiumExecutable.headless,
      ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await refreshTrendlyne(page);

    let timeTaken = Date.now() - start;
    console.log("Total time taken : " + timeTaken + " milliseconds");
    return {
      statusCode: 200,
      body: "Trendlyne Refreshed....."
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  } finally {
    if (browser !== null) {
      await browser.close();
      await client.close();
    }
  }
};