const fetch = require('node-fetch');
const qs = require('querystring');

exports.handler = async (event, context, callback) => {
  const selectedvalue = event.queryStringParameters.selectedvalue;
  const filter = event.queryStringParameters.filter;
  const order = (event.queryStringParameters.order);
  try {
    let args;
    args = event.body;
    const response = await fetch('https://etmarketsapis.indiatimes.com/ET_Screeners/getFilteredData', {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        Referer: 'https://economictimes.indiatimes.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      
      body: `{"stockScoreFilterName":"${selectedvalue}","sortedField":"${filter}","pageSize":"20","sortedOrder":"${order}","pageNumber":1,"exchangeId":"50","isBankingSector":"false","fieldNames":"*"}`,
      method: 'POST'
    });
   
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    
    const data = await response.json();
    process.env.data2 = JSON.stringify({ data });
    
    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({data}),
     };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
