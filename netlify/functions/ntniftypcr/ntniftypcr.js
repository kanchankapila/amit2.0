const handler = async function () {
  try {
    // Dynamically import node-fetch using import()
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://webapi.niftytrader.in/webapi/option/oi-pcr-data?symbolName=nifty&reqType=nse_pcr_data&reqDate=', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    // Output error to function log
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
}

module.exports = { handler };
