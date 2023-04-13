const chromium = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')
const axios = require('axios');

exports.handler = async (event,context,callback) => {
  
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
            // ignoreDefaultArgs: ["--disable-extensions","--single-process"]
      })
 
      // Use page cache when loading page.
      page = await browser.newPage();
      await page.setCacheEnabled(true)
      
      const targetUrl = 'https://trendlyne.com/visitor/loginmodal/'
 
      await page.goto(targetUrl, {
        waitUntil: ["domcontentloaded"]
      })
 
     
         await page.type('#id_login', 'amit.kapila.2009@gmail.com');
         
         await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
       
          
    cookie = await page.cookies()
    // console.log(cookie)
    for (let val in cookie){
     
        if (cookie[val].name == '.trendlyne'){
          process.env.trnd=cookie[val].value
        
       }}
       for (let val in cookie){
       if (cookie[val].name == 'csrftoken'){
         process.env.csrf=cookie[val].value
      
      }
    }
   
      const data = {
        "collection": "cookie",
        "database": "Trendlynecookie",
        "dataSource": "Cluster0",
        "filter":{},
        "update":{$set: {
          "csrf":  process.env.csrf,
          "trnd":  process.env.trnd,
          "time": start
        }},
        "upsert":true
        };
        const config = {
          method: 'post',
          url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-oqytz/endpoint/data/v1/action/updateOne',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy',
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
        // await client.close();
      }
    }
  };
