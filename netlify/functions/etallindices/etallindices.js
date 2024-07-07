const handler = async function () {
  try {
    const fetch = await import('node-fetch').then(module => module.default);

    const response = await fetch('https://etmarketsapis.indiatimes.com/ET_Stats/getAllIndices?exchange=nse&sortby=value&sortorder=desc&pagesize=100', {
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
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
