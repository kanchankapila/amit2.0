
const axios = require('axios');
const investingindicators = async (indexid, duration) => {
  try {
    const response = await fetch(`https://api.investing.com/api/financialdata/technical/analysis/${indexid}/${duration}`, {
      headers: {
        "accept": "*/*",
        
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "domain-id": "in",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
        "sec-ch-ua-mobile": "?0",
        // "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://in.investing.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
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
    const { indexid, duration } = event.queryStringParameters;
    const result = await investingindicators(indexid, duration);

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