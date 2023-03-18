const fetch = require('node-fetch')

exports.handler = async (event, context,callback) => {
  try {
    
   
    const tlid = (event.body);
    console.log(tlid)
    const response = await fetch('https://trendlyne.com/mapp/v1/stock/chart-data/' + tlid + '/SMA/', {
      headers: { Accept: 'application/json' },
    })
    // obj1=({ Date: symbol.Date,Time:symbol.time, Name: symbol.name,DurabilityScore: response.data.body.stockData[6], VolatilityScore: response.data.body.stockData[7], MomentumScore: response.data.body.stockData[8]  })
        
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
  
    process.env.data12=JSON.stringify({data});
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




