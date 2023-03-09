const fetch = require('node-fetch')
const qs=require('querystring')
// const handler = async function () {
  exports.handler = async (event, context,callback) => {
    const selectedvalue = (event.queryStringParameters.selectedvalue);
    const filter = (event.queryStringParameters.filter);
    const order = (event.queryStringParameters.order);
  try {
   
   console.log(selectedvalue)
    
    let args;
    args = (event.body);
    
    //  console.log(JSON.stringify(event.body))
    const response = await fetch("https://etmarketsapis.indiatimes.com/ET_Screeners/getFilteredData", {
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
     
      body: `{"predefinedFilterName":"${selectedvalue}","sortedField":"${filter}","pageSize":"20","sortedOrder":"${order}","pageNumber":1,"exchangeId":"50","isBankingSector":"false","fieldNames":"*"}`,
      method: 'POST'
    });
    
    
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
   console.log(data)
    process.env.data2 = JSON.stringify({ data })
    
    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true
      },
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
