import fetch from 'node-fetch';

const apiUrl = process.env.MONGOAPIURL; // MongoDB Data API endpoint (should end with /action/find)
const apiKey = process.env.MONGOAPIKEY; // MongoDB Data API key
const database = 'Trendlynecookie';
const collection = 'cookie';

async function getTokensFromMongoDataAPI() {
  const query = {
    collection,
    database,
    dataSource: 'Cluster0', // Replace with your actual data source/cluster name
    filter: {},
    sort: { time: -1 },
    limit: 1
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`MongoDB Data API error: ${text}`);
  }

  const data = await response.json();
  const doc = data.documents && data.documents[0];
  if (!doc || !doc.csrf || !doc.trnd) {
    throw new Error('Missing CSRF or TRND token in MongoDB Data API response.');
  }
  console.log('Extracted csrf:', doc.csrf, 'trnd:', doc.trnd);
  return { csrf: doc.csrf, trnd: doc.trnd };
}

const trendlyne = async (tlid, tlname, eqsymbol) => {
  const { csrf, trnd } = await getTokensFromMongoDataAPI();
  console.log('Using tokens:', csrf, trnd);

  const url = `https://trendlyne.com/equity/getStockMetricParameterList/${tlid}`;
  console.log('Fetching:', url);

  const response = await fetch(url, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "x-requested-with": "XMLHttpRequest",
      cookie: `_gid=GA1.2.437560219.1668751717;.trendlyne=${trnd}; csrftoken=${csrf};`,
    },
    referrer: `https://trendlyne.com/equity/${tlid}/${eqsymbol}/${tlname}/`,
    method: "GET",
  });

  console.log('Trendlyne response status:', response.status);

  if (!response.ok) {
    const text = await response.text();
    console.log('Trendlyne error response:', text);
    return { statusCode: response.status, body: text };
  }

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const handler = async (event) => {
  const { tlid, tlname, eqsymbol } = event.queryStringParameters;
  try {
    return await trendlyne(tlid, tlname, eqsymbol);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
