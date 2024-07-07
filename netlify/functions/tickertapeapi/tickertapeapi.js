const handler = async function () {
  try {
    // Dynamically import 'node-fetch'
    const fetch = await import('node-fetch').then(module => module.default);

    const response = await fetch('https://api.tickertape.in/mmi/now', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const ttmmi = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ttmmi }),
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
