const investingindicators = async (indexid, duration) => {
  try {
    const response = await fetch(`https://api.investing.com/api/financialdata/technical/analysis/${indexid}/${duration}`, {
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Referer": "https://in.investing.com/",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      method: "GET"
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
