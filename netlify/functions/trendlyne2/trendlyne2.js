const fetch = require('node-fetch')

const trendlynefetch = async (tlid,event, context,callback) => {
  try {
    const response = await fetch('https://trendlyne.com/mapp/v1/stock/chart-data/' + tlid + '/SMA/', {
      headers: { Accept: 'application/json' },
    })
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

const handler = async (event) => {
  const tlid = (event.queryStringParameters.tlid);

 
 //  await chrome();
  await trendlynefetch(tlid);

 return {
   statusCode: 200,
   body: process.env.data12,
  
 
 };
};
module.exports = { handler }


