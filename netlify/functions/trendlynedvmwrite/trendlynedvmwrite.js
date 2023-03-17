const { MongoClient } = require('mongodb');
const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI, { useUnifiedTopology: true });

const fetch = require('node-fetch')

exports.handler = async (event,context,callback) => {
   const tlid = (event.body);
  try {
    // await client1.connect();
    console.log("tlid"+event.body)
     console.log(event.body)
    // const promises = args.map(async symbol => {
    
        
    // const response= axios.get('https://trendlyne.com/mapp/v1/stock/web/ohlc/' + symbol.tlid).then((response) => {
    //     obj1=({ Date: symbol.Date,Time:symbol.time, Name: symbol.name,DurabilityScore: response.data.body.stockData[6], VolatilityScore: response.data.body.stockData[7], MomentumScore: response.data.body.stockData[8]  })
        
    //   })
  
  //   try {
  //     await Promise.all(promises)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // })
  
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    console.log(data)
    let compressedData = JSON.stringify({ data });
    compressedData = compressedData.replace(/\s/g, ""); // this line removes whitespace 
    process.env.trendlynedvm = compressedData;
    return {
      statusCode: 200,
      body: process.env.trendlynedvm,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
      await client1.close();
  }
};
