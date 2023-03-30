'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios=require('axios')
const bodyParser = require('body-parser');



app.use(bodyParser);

const axiosApiInstance = axios.create({
  baseURL: 'https://data.mongodb-api.com/app/data-cibaq/endpoint/data/v1/action',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy ',
    Accept: 'application/ejson'
  }
});

app.post('/api/trendlynepostdvm', async function (req,event, res) {
  const start = Date.now();
  const obj=[];
  let tlid = event.body;
  console.log(tlid)

 
  const promises = tlid.map(async symbol => {
 

   const response= await fetch(
      `https://trendlyne.com/mapp/v1/stock/chart-data/${symbol.tlid}/SMA/?format=json`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    const data1 = await response.json();
  
    try{
            obj.push({
      Date: symbol.Date,
      Time: symbol.time,
      Name: symbol.name,
      DurabilityScore: data1.body['stockData'][6],
      DurabilityColor: data1.body['stockData'][9],
      VolatilityScore: data1.body['stockData'][7],
      VolatilityColor: data1.body['stockData'][10],
      MomentumScore: data1.body['stockData'][8],
      MomentumColor: data1.body['stockData'][11]
    })
    
 
  await axiosApiInstance.post('/updateMany', {
    collection: 'DVM',
    database: 'DVM',
    dataSource: 'Cluster0',
    filter: {},
    update: {
      $set: {
        output: obj,
        time: start
      }
    },
    upsert: true
  });
}catch (error){
  console.log('error')
}
  const timeTaken = Date.now() - start;
  console.log(`Total time taken: ${timeTaken} milliseconds`);

  console.log(obj)
  try {
    await Promise.all(promises)
  } catch (e) {
    console.log(e)
  }
})

});


module.exports.handler = serverless(app);


// const fetch = require('node-fetch')
// const qs=require('querystring')

//   exports.handler = async (event, context,callback) => {
//     const ntoptions = (event.queryStringParameters.ntoptions);
//   try {
//     const response1=await fetch("https://webapi.niftytrader.in/webapi/Account/userLoginNew", {
//       "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//         "content-type": "application/json",
//         "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
//         "sec-ch-ua-mobile": "?1",
//         "sec-ch-ua-platform": "\"Android\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-site"
//       },
//       "referrer": "https://www.niftytrader.in/",
//       "referrerPolicy": "strict-origin-when-cross-origin",
//       "body": "{\"email\":\"amit.kapila.2009@gmail.com\",\"password\":\"amit0605\",\"platform_type\":1}",
//       "method": "POST",
//       "mode": "cors",
//       "credentials": "omit"
//     });
    
   
//     if (!response1.ok) {
//       // NOT res.status >= 200 && res.status < 300
//       return { statusCode: response.status, body: response.statusText }
//     }
//     const data1 = await response1.json()
  
//     process.env.data1 = (data1['resultData']['token'])
    
   
    
//     let args;
//     args = (event.body);
    
//     //  console.log(JSON.stringify(event.body))
//     const response = await fetch('https://api.niftytrader.in/webapi/Screener/getAdvanceEodScreenerFilter', {
//      method: 'POST', // Don't forget this line
  
//      "headers": {
//        "accept": "application/json, text/plain, */*",
//        "accept-language": "en-US,en;q=0.9",
//        "authorization": "Bearer "+process.env.data1,
//        "content-type": "application/json",
//        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
//        "sec-ch-ua-mobile": "?0",
//        "sec-ch-ua-platform": "\"Windows\"",
//        "sec-fetch-dest": "empty",
//        "sec-fetch-mode": "cors",
//        "sec-fetch-site": "same-site"
//      },
//      "referrer": "https://www.niftytrader.in/",
//      "referrerPolicy": "strict-origin-when-cross-origin",
//      // "body": "{\"_20_day_sma_below\": true}",
//      "body":(args),
//      "method": "POST",
//      "mode": "cors",
//      "credentials": "include"
//    })
//     if (!response.ok) {
//       // NOT res.status >= 200 && res.status < 300
//       return { statusCode: response.status, body: response.statusText }
//     }
//     const data = await response.json()
   
//     process.env.data2 = JSON.stringify({ data })
    
//     return {
//       statusCode: 200,
//       headers: {
//         /* Required for CORS support to work */
//         "Access-Control-Allow-Origin": "*",
//         /* Required for cookies, authorization headers with HTTPS */
//         "Access-Control-Allow-Credentials": true
//       },
//       body: JSON.stringify({data}),
//      }
//   } catch (error) {
//     // output to netlify function log
//     console.log(error)
//     return {
//       statusCode: 500,
//       // Could be a custom message or object i.e. JSON.stringify(err)
//       body: JSON.stringify({ msg: error.message }),
//     }
//   }
// }




