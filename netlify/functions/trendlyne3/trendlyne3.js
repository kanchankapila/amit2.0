const fetch = require('node-fetch')
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const axios=require('axios');   
const trendlyne = async (tlid,event, context,callback) => {
  const obj=[];
  try {
    
    // const uri = 'mongodb+srv://amit:amit0605@cluster0.mxilo.mongodb.net/?retryWrites=true&w=majority';
    // await client.connect();
  
    // const db = client.db('DVM')
    // const collection=db.collection('DVM');
    // console.log("Client Connected...")
     url=JSON.parse(tlid)
     const start = Date.now();
    const results=await Promise.all(url.map(async  url => {
      try{
        // console.log(url.tlid)
        const response = await fetch('https://trendlyne.com/mapp/v1/stock/chart-data/' + url.tlid + '/SMA/?format=json', {
          headers: { Accept: 'application/json' },
         
        }).then(async (response) => {
        const data1 = await response.json()
        obj.push({ Date: url.Date,Time:url.time, Name: url.name,DurabilityScore: data1.body['stockData'][6], VolatilityScore: data1.body['stockData'][7], MomentumScore: data1.body['stockData'][8]  })
        }).catch((error) => {
          console.log(error)
        })
        // console.log(data1.body['stockData'])
        console.log(obj)
        const data2 = {
          "collection": "DVM",
          "database": "DVM",
          "dataSource": "Cluster0",
          "filter":{},
          "update":{$set: {
            "output": obj,
            
            "time": start
          }},
          "upsert":true
          };
          const config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-cibaq/endpoint/data/v1/action/updateOne',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy',
              'Accept': 'application/ejson'
            },
            data2,
        };
        const result = await axios(config);
     
    // await collection.insertMany({"output":obj});
        return{url,data: data1};
      } catch(error){
        return{url,error:error.message}
      }
    }));
   
    
    if (!results.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: results.status, body: results.statusText }
    }
   
   
    

  
    
  

  
    // process.env.data12=JSON.stringify({data});
    return {
      statusCode: 200,
      body: JSON.stringify({data}),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
   finally{
   
    // await client.close();
    console.log("Client disonnected...")
  }
}
const handler = async (event) => {
  const tlid = event.body;
 
  await trendlyne(tlid);
  return{
    statusCode:200,
    body:JSON.stringify({
    headers:
      {
      "Access-Control-Allow-Origin":'*',
      "Access-Control-Allow-Credentials":true
    }
  })
  }
};

module.exports = { handler };



