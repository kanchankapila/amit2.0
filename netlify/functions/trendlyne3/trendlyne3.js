const fetch = require('node-fetch')
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI, { useNewUrlParser: true, useUnifiedTopology: true });
   
const trendlyne = async (tlid,event, context,callback) => {
  
  try {
    
    // const uri = 'mongodb+srv://amit:amit0605@cluster0.mxilo.mongodb.net/?retryWrites=true&w=majority';
    await client.connect();
  
    const db = client.db('DVM');
    const collection = db.collection('DVM');
    
    url=JSON.parse(tlid)
  
    const results=await Promise.all(url.map(async  url => {
      try{
        // console.log(url.tlid)
        const response = await fetch('https://trendlyne.com/mapp/v1/stock/chart-data/' + url.tlid + '/SMA/?format=json', {
          headers: { Accept: 'application/json' },
        })
        const data1 = await response.json()
        console.log(data1.body['stockData'])
        return{url,data: data1};
      } catch(error){
        return{url,error:error.message}
      }
    }));
   
    
    if (!results.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: results.status, body: results.statusText }
    }
   
   
    const data = {
      ...obj,
      output: data1,
    };

    const result = await collection.insertOne(data1);
    results.push(result);
  

  
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
    await client.close();
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



