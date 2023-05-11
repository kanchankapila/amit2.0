
const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')
const axios = require('axios');
require('dotenv').config()
const mysql = require('mysql2')


exports.handler = async (event,context,callback) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()
    let browser = null
    console.log('spawning chrome headless')
    try {
      const start = Date.now();
      const executablePath = process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath 
 
      // setup
      browser = await puppeteer.launch({
             args: chromium.args,
           
        executablePath: executablePath,
         headless:chromium.headless,
          ignoreHTTPSErrors: true,
           
      })
      page = await browser.newPage();
      await page.setCacheEnabled(true)
      
      const targetUrl = 'https://opstra.definedge.com/ssologin'
      await page.goto(targetUrl, {
        waitUntil: ["domcontentloaded"]
      })
 
     
      
      // Use page cache when loading page.
      await page.type('#username', 'amit.kapila.2009@gmail.com');
    
      await page.type('#password', process.env.OPSTRA_PASSWORD);
 
   
     cookie= await page.cookies()
    
   
   
     
    for (let val in cookie){
     
        if (cookie[val].name == 'JSESSIONID'){
          process.env.jsessionid=cookie[val].value
         
       }}
       
    
    
      const data = {
        "collection": "cookie",
        "database": "Opstracookie",
        "dataSource": "Cluster0",
        "filter":{},
        "update":{$set: {
          "jsessionid":  process.env.jsessionid,
          
          "time": start
        }},
        "upsert":true
        };
        const config = {
          method: 'post',
          url: process.env.mongoapikey+'/updateOne',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.mongoapikey,
            'Accept': 'application/ejson'
          },
          data,
      };
      const result = await axios(config);
            
      // return response data
      callback(null, {
          statusCode: 200,
          body: "Inserted"
      });
      const timeTaken = Date.now() - start;
      console.log(`Total time taken: ${timeTaken} milliseconds`);
 
     
    } catch (error) {
      console.log(error);
      callback(err);
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
