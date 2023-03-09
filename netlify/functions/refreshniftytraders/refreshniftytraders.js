const fetch = require('node-fetch')
const qs=require('querystring')
// const handler = async function () {
  exports.handler = async (event, context,callback) => {
    const ntoptions = (event.queryStringParameters.ntoptions);
  try {
    
    let args;
    args = (event.body);
    const response=await fetch("https://webapi.niftytrader.in/webapi/Account/userLoginNew", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://www.niftytrader.in/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"email\":\"amit.kapila.2009@gmail.com\",\"password\":\"amit0605\",\"platform_type\":1}",
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    });
    
   
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data1 = await response.json()
  
    process.env.data1 = (data1['resultData']['token'])
    
    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true
      },
      body:process.env.data1 ,
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


// const handler = async (event) => {
 
//   const ntoptions = (event.queryStringParameters.ntoptions);
  
//      console.log((ntoptions))
 
  
//   await ntfetch(ntoptions);

//  return {
//    statusCode: 200,
//    body: process.env.data1,
  
 
//  };
// };

// module.exports = { handler }


