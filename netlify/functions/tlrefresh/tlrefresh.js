const chromium = require("@sparticuz/chromium");
const puppeteer = require('puppeteer-core');

chromium.setHeadlessMode = true; 
chromium.setGraphicsMode = false;

exports.handler = async function (event, context) {
  try{
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath("/opt/build/repo/node_modules/chromium/lib/chromium/chrome-linux/chrome"),
    headless: chromium.headless,
  });
   // Do stuff with headless chrome
   const page = await browser.newPage()
   const targetUrl = 'https://davidwells.io'

   // Goto page and then do stuff
   await page.goto(targetUrl, {
     waitUntil: ["domcontentloaded", "networkidle0"]
   })

   await page.waitForSelector('#phenomic')

   theTitle = await page.title();

   console.log('done on page', theTitle)

 } catch (error) {
   console.log('error', error)
   return {
     statusCode: 500,
     body: JSON.stringify({
       error: error
     })
   }
 } finally {
   // close browser
  //  if (browser !== null) {
  //    await browser.close()
  //  }
 }



return {
    statusCode: 200,
    body: JSON.stringify({
        status: "The 'Element' function works!"        
    })
  };
}