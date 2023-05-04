const fetch = require('node-fetch')

const tlsscreener = async (screenercode,event, context,callback) => {
  try {
    const response = await fetch('https://kayal.trendlyne.com/broker-webview/kayal/all-in-one-screener-data-get/?perPageCount=200&pageNumber=0&screenpk='+screenercode+'&groupType=all&groupName=', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
  
    process.env.data15=JSON.stringify({data});
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
  const screenercode = (event.queryStringParameters.screenercode);
  console.log(screenercode)
 
 //  await chrome();
  await tlsscreener(screenercode);

 return {
   statusCode: 200,
   body: process.env.data15,
  
 
 };
};
module.exports = { handler }


