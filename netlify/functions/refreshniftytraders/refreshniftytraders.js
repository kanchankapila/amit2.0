const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
  try {
    const response = await fetch("https://webapi.niftytrader.in/webapi/Account/userLoginNew", {
      method: "POST",
      headers: {
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
      referrer: "https://www.niftytrader.in/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({
        email: "amit.kapila.2009@gmail.com",
        password: "amit0605",
        platform_type: 1
      }),
      mode: "cors",
      credentials: "omit"
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data1 = await response.json();
    process.env.data11 = data1.resultData.token;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
      },
      body: process.env.data11
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  }
};
