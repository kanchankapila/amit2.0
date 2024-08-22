const chromium = require("@sparticuz/chromium");
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const util = require('util');

const decompress = util.promisify(zlib.brotliDecompress);

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

exports.handler = async function (event, context) {
  let browser = null;

  try {
    // Path to the compressed chromium binary
    const cwd = process.cwd();
  console.log(cwd)
  const tempChromiumPath1 = path.resolve(cwd,'chromium')

    const compressedChromiumPath = path.resolve(cwd, 'node_modules', '@sparticuz', 'chromium', 'bin','chromium.br');
    // Path where the deflated binary will be saved
    const deflatedChromiumPath = '/tmp/chromium';

    // Check if the deflated chromium already exists, otherwise deflate it
    if (!fs.existsSync(deflatedChromiumPath)) {
      console.log('Deflating chromium binary...');
      const compressedBuffer = fs.readFileSync(compressedChromiumPath);
      const deflatedBuffer = await decompress(compressedBuffer);
      fs.writeFileSync(deflatedChromiumPath, deflatedBuffer);
      fs.chmodSync(deflatedChromiumPath, '755'); // Ensure it's executable
    } else {
      console.log('Chromium binary already deflated.');
    }

    const executablePath = deflatedChromiumPath;

    // Launch headless Chrome with the appropriate configuration
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
    });

    // Do stuff with headless chrome
    const page = await browser.newPage();
    const targetUrl = 'https://davidwells.io';

    await page.goto(targetUrl, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    });

    await page.waitForSelector('#phenomic');

    const theTitle = await page.title();

    console.log('Done on page', theTitle);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "The 'Element' function works!",
        title: theTitle
      }),
    };
  } catch (error) {
    console.error('Error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  } finally {
    // Close the browser if it was successfully opened
    if (browser !== null) {
      await browser.close();
    }
  }
};
