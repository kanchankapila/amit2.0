exports.handler = async (event) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);

    const bqnames = event.queryStringParameters.bqnames;
    const dateday5 = event.queryStringParameters.dateday5;
    const datetoday = event.queryStringParameters.datetoday;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${bqnames}&from=${dateday5}&to=${datetoday}&sortBy=popularity&apiKey=28bda70739cc4024ba3f30223e8c25a8`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
