
const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')
const axios = require('axios');
const fetch = require('node-fetch')

const opstrafetch = async (event,context,callback) => {
  
    let browser = null
    console.log('spawning chrome headless')
    try {
      const start = Date.now();
      const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
 
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
    
    console.log(cookie)
   
     
    for (let val in cookie){
     
        if (cookie[val].name == 'JSESSIONID'){
          jsessionid=cookie[val].value
         console.log(jsessionid)
       }}
       
       const response = await fetch("https://opstra.definedge.com/api/futures/pcr/chart/"+eqsymbol, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
         
          "cookie": `_ga=GA1.2.747701652.1663270048; _gid=GA1.2.422693227.1669215741;JSESSIONID=${jsessionid['jsessionid']}; _gat=1;`, 
            
        },
        "body": null,
        "method": "GET"
      }
       )
      // const data = {
      //   "collection": "cookie",
      //   "database": "Opstracookie",
      //   "dataSource": "Cluster0",
      //   "filter":{},
      //   "update":{$set: {
      //     "jsessionid":  process.env.jsessionid,
          
      //     "time": start
      //   }},
      //   "upsert":true
      //   };
      //   const config = {
      //     method: 'post',
      //     url: 'https://data.mongodb-api.com/app/data-cibaq/endpoint/data/v1/action/updateOne',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Access-Control-Request-Headers': '*',
      //       'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy',
      //       'Accept': 'application/ejson'
      //     },
      //     data,
      // };
      // const result = await axios(config);
            
      // return response data
      if (!response.ok) {
        return { statusCode: response.status, body: response.statusText };
      }
     
      const data = await response.json();
      let compressedData = JSON.stringify({ data });
      compressedData = compressedData.replace(/\s/g, ""); // this line removes whitespace 
      process.env.opstra1 =compressedData;
      return {
        statusCode: 200,
        body: process.env.opstra1,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    } finally {
        
    }
  };
  const handler = async (event) => {
    const { eqsymbol } = event.queryStringParameters;
    await opstrafetch( eqsymbol);
   
    // 
    return {
      statusCode: 200,
      body:process.env.opstra
    };
  };
  
  module.exports = { handler };
  
        
       