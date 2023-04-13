'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios=require('axios')
const bodyParser = require('body-parser');



app.use(bodyParser);

const axiosApiInstance = axios.create({
  baseURL: process.env.mongoapiurl,
 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.mongoapikey,
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






