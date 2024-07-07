const handler = async (event, context, callback) => {
  try {
    // Dynamically import node-fetch using import()
    const fetch = (await import('node-fetch')).default;

    const eqsymbol = event.queryStringParameters.eqsymbol;
    const response = await fetch(`https://api.niftytrader.in/webapi/Live/livechartsBySymbol?symbol=${eqsymbol}`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    process.env.data8 = JSON.stringify({ data });

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
