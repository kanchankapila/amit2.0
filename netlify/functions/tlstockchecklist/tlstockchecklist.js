const axios = require('axios');

const tlstockcl = async (tlid) => {
  try {
    const response = await axios.get(`https://kayal.trendlyne.com/clientapi/kayal/content/checklist-bypk/${tlid}`);
    const html = response.data;

    process.env.tlstockcl = html; // Store HTML content in environment variable (not recommended for large payloads)

    return {
      statusCode: 200,
      body: html,
      headers: {
        'Content-Type': 'text/html',
        // Add any additional headers as needed
      },
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

exports.handler = async (event) => {
  try {
    const tlid = event.queryStringParameters.tlid;

    const result = await tlstockcl(tlid);

    return {
      statusCode: result.statusCode,
      body: result.body,
      headers: result.headers,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
