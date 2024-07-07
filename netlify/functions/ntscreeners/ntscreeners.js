const handler = async function (event, context, callback) {
  try {
    // Dynamically import node-fetch using import()
    const fetch = (await import('node-fetch')).default;
    const qs = (await import('querystring')).default;

    const response1 = await fetch("https://webapi.niftytrader.in/webapi/Account/userLoginNew", {
      method: 'POST',
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
        "email": "amit.kapila.2009@gmail.com",
        "password": "Angular@789",
        "platform_type": 1
      }),
      mode: "cors",
      credentials: "omit"
    });

    if (!response1.ok) {
      return { statusCode: response1.status, body: response1.statusText };
    }

    const data1 = await response1.json();
    process.env.data1 = data1.resultData.token;

    const args = event.body;
    const response = await fetch('https://api.niftytrader.in/webapi/Screener/getAdvanceEodScreenerFilter', {
      method: 'POST',
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer " + process.env.data1,
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      referrer: "https://www.niftytrader.in/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: args,
      mode: "cors",
      credentials: "include"
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    process.env.data2 = JSON.stringify({ data });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ data })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  }
}

module.exports = { handler };
