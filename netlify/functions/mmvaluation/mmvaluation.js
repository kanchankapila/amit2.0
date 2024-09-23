const handler = async function (event, context, callback) {
  try {
    // Dynamically import node-fetch using import()
    const fetch = (await import('node-fetch')).default;

    // Extract stockid from query parameters
    const stockid = event.queryStringParameters?.stockid;

    // First API call to /stocks/valuationMeter
    const valuationResponse = await fetch("https://frapi.marketsmojo.com/stocks/valuationMeter", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "text/plain",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.marketsmojo.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: JSON.stringify({ stock_id: stockid }), // Use stockid in the request body
      method: "POST"
    });

    if (!valuationResponse.ok) {
      return { statusCode: valuationResponse.status, body: valuationResponse.statusText };
    }

    const valuationData = await valuationResponse.json();

    // Second API call to /stocks_quality/vcardinfo
    const qualityResponse = await fetch(`https://frapi.marketsmojo.com/stocks_quality/vcardinfo?sid=${stockid}`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.marketsmojo.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      method: "GET"
    });

    if (!qualityResponse.ok) {
      return { statusCode: qualityResponse.status, body: qualityResponse.statusText };
    }

    const qualityData = await qualityResponse.json();

    // Combine both sets of data
    const combinedData = {
      valuationData,
      qualityData
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(combinedData)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  }
};

module.exports = { handler };
