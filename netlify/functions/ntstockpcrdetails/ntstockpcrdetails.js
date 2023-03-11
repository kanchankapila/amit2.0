const fetch = require('node-fetch')

// const handler = async function () {
  const ntstockdetailsfetch = async (eqsymbol,event, context,callback) => {
    
  try {
    const response = await fetch('https://api.niftytrader.in/webapi/Live/kiteInstrumentNfoListNew', {
      method: 'POST', // Don't forget this line
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://www.niftytrader.in/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": '{\"symbol\":\"'+eqsymbol+'\"}',
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    process.env.data10=JSON.stringify({data})
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
 
  
  await ntstockdetailsfetch(eqsymbol);

 return {
   statusCode: 200,
   body: process.env.data10,
  
 
 };
};

module.exports = { handler }


