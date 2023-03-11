const fetch = require('node-fetch')

const ntstock1yrfetch = async (eqsymbol,event, context,callback) => {
  try {
    const response = await fetch('https://api.niftytrader.in/webapi/Live/livechartsBySymbol?symbol=' + eqsymbol, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
  
    process.env.data8=JSON.stringify({data});
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
  const eqsymbol = (event.queryStringParameters.eqsymbol);


 //  await chrome();
  await ntstock1yrfetch(eqsymbol);

 return {
   statusCode: 200,
   body: process.env.data8,
  
 
 };
};
module.exports = { handler }


