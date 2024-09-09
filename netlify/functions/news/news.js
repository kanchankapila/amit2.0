
const axios = require('axios');
const getnews = async (bqnames,dateday5,datetoday) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);
    const response = await fetch(`https://newsapi.org/v2/everything?q=${bqnames}&from=${dateday5}&to=${datetoday}&sortBy=popularity&apiKey=28bda70739cc4024ba3f30223e8c25a8`, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ msg: error.message }),
    };
  }
};  

  
   
exports.handler = async (event, context) => {
  try {
    const { bqnames,dateday5,datetoday } = event.queryStringParameters;
    const result = await getnews(bqnames,dateday5,datetoday);

    return {
      statusCode: result.statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: result.body,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ msg: 'Internal server error' }),
    };
  }
};
