const fetch = require('node-fetch')

const trendlyne = async (tlid,event, context,callback) => {
  try {
    
   
    
    url=JSON.parse(tlid)
    const results=await Promise.all(tlids.map(async  url => {
      try{
        const response = await fetch('https://trendlyne.com/mapp/v1/stock/chart-data/' + url.tlid + '/SMA/', {
          headers: { Accept: 'application/json' },
        })
        return{url,data: response.data};
      } catch(error){
        return{url,error:error.message}
      }
    }));
   
    // obj1=({ Date: symbol.Date,Time:symbol.time, Name: symbol.name,DurabilityScore: response.data.body.stockData[6], VolatilityScore: response.data.body.stockData[7], MomentumScore: response.data.body.stockData[8]  })
        
    if (!results.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
   
    const data = await results.json()
  
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
}
const handler = async (event) => {
  const tlid = event.body;
 console.log("a="+typeof(tlid))
  await trendlyne(tlid);
  return{
    statusCode:200,
    body:JSON.stringify(results)
  }
};

module.exports = { handler };




