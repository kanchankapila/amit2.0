const handler = async (event, context, callback) => {
  try {
    // Dynamically import node-fetch using import()
    const fetch = (await import('node-fetch')).default;

    const eqsymbol = event.queryStringParameters.eqsymbol;
    const response = await fetch('https://api.niftytrader.in/webapi/Live/stockAnalysis', {
      method: 'POST',
      headers: {
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
      referrer: "https://www.niftytrader.in/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({ symbol: eqsymbol }),
      mode: "cors",
      credentials: "omit"
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    process.env.data9 = JSON.stringify({ data });

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
