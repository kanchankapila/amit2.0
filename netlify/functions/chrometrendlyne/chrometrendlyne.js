const { get, set } = require('@netlify/blobs');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const trendlyne = async (tlid, tlname, eqsymbol) => {
  try {
    // ⬇️ Retrieve csrf and trnd from Netlify Blob storage
    const csrf = await get('trendlyne/csrf', { type: 'text' });
    const trnd = await get('trendlyne/trnd', { type: 'text' });

    if (!csrf || !trnd) {
      throw new Error('Missing CSRF or TRND token in blob storage.');
    }

    const response = await fetch(`https://trendlyne.com/equity/getStockMetricParameterList/${tlid}`, {
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "x-requested-with": "XMLHttpRequest",
        "cookie": `_gid=GA1.2.437560219.1668751717;.trendlyne=${trnd}; csrftoken=${csrf}; __utma=185246956.775644955.1603113261.1614010114.1614018734.3; _ga=GA1.2.1847322061.1668751717; _gat=1`,
      },
      referrer: `https://trendlyne.com/equity/${tlid}/${eqsymbol}/${tlname}/`,
      method: "GET",
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    let compressedData = JSON.stringify({ data }).replace(/\s/g, "");

    // ⬇️ Store response in blob
    const blobKey = `trendlyne/metrics_${tlid}_${eqsymbol}`;
    await set(blobKey, compressedData);

    return {
      statusCode: 200,
      body: compressedData,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

const handler = async (event) => {
  const { tlid, tlname, eqsymbol } = event.queryStringParameters;
  return await trendlyne(tlid, tlname, eqsymbol);
};

module.exports = { handler };
