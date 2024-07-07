exports.handler = async () => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);

    const response = await fetch('https://render-express-e54x.onrender.com/api/ttvolnmcinsight', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
