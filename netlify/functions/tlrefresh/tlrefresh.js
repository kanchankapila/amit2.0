const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const brotli = require('brotli');
exports.handler = async function (event, context) {
  let browser = null;
  const tempChromiumPath = '/tmp/chromium';
  
  const cwd = process.cwd();
  console.log(cwd)
  const tempChromiumPath1 = path.resolve(cwd,'chromium')
  const binPath = path.resolve(cwd, 'var','task','netlify','functions','node_modules', '@sparticuz', 'chromium', 'bin');
  const files2 = fs.readdirSync(cwd);
  const binPath3 = path.resolve(cwd, 'var','task','netlify')
  console.log('Files in cwd:',files2 );
  const files3 = fs.readdirSync(binPath3);
  console.log('Files in /opt/build/repo:', files3);

  try {
    // Check if Chromium is already deflated and exists in /tmp
    if (!fs.existsSync(tempChromiumPath)) {
      console.log('Chromium not found in /tmp, extracting...');
      console.log("0")
     
      
      
      // Get the path to the compressed Chromium binary in node_modules
      const compressedChromiumPath =  path.resolve(cwd,  'node_modules', '@sparticuz', 'chromium', 'bin', 'chromium.br');
      console.log(compressedChromiumPath)
   
      const binPath1 = path.resolve(cwd);
  
  
        const files = fs.readdirSync(binPath);
        console.log('Files in chromium/bin:', files);
     
    
      console.log("1")
      // Read the compressed binary
      const compressedBuffer = fs.readFileSync(compressedChromiumPath);
      console.log("2")
      // Decompress the binary using Sparticuz's decompress method
      const decompressedBuffer = brotli.decompress(compressedBuffer);
      console.log("3")
      // Write the decompressed binary to /tmp/chromium
      fs.writeFileSync(tempChromiumPath1, decompressedBuffer);
      fs.chmodSync(tempChromiumPath1, '755'); // Ensure it's executable
      
      console.log('Chromium extracted to /tmp/chromium.');
      const files1 = fs.readdirSync(binPath);
        console.log('Files in chromium/bin:', files1);
    } else {
      console.log('Chromium already exists in /tmp.');
    }

    // Launch Puppeteer with the Chromium binary in /tmp/chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: tempChromiumPath1,
      headless: chromium.headless,
    });

    // Use Puppeteer as needed
    const page = await browser.newPage();
    await page.goto('https://google.com', { waitUntil: 'networkidle2' });

    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success', title: pageTitle }),
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
