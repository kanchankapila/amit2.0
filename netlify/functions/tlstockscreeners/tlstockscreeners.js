const { MongoClient } = require('mongodb');

// CORS setup function
const setCorsHeaders = (response) => {
  response.headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins, or specify a domain
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
  };
  return response;
};

const tlsscreener = async (screenercode) => {
  const uri = process.env.MONGODB_ATLAS_CLUSTER_URI; // MongoDB connection string
  const dbName = 'Trendlyne'; // Update with your database name
  const collectionName = 'cookie'; // Update with your collection name
  let client;
  const fetch = await import('node-fetch').then(module => module.default);

  try {
    // Connect to MongoDB
    client = await MongoClient.connect(uri);
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Query MongoDB for necessary data (csrf, trnd, time)
    const rows = await collection.find().toArray();
    for (const row of rows) {
      const { csrf, time, trnd } = row;
      process.env.csrf = csrf;
      process.env.trnd = trnd;
      process.env.time = time;
    }

    // Fetch data from Trendlyne API using screenercode
    const response = await fetch(`https://kayal.trendlyne.com/broker-webview/kayal/all-in-one-screener-data-get/?perPageCount=200&pageNumber=0&screenpk=${screenercode}&groupType=all&groupName=`, {
      "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": `_ga=GA1.1.1667715230.1722073196; csrftoken=${process.env.csrf}; .trendlyne=${process.env.trnd}; _ga_J2YW7VJGYP=GS1.1.1724684711.1.1.1724684877.0.0.0; _ga_7F29Q8ZGH0=GS1.1.1724697677.11.1.1724697682.55.0.0`
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
    });

    if (!response.ok) {
      return setCorsHeaders({ statusCode: response.status, body: response.statusText });
    }

    const data = await response.json();
    process.env.data15 = JSON.stringify({ data });

    return setCorsHeaders({
      statusCode: 200,
      body: JSON.stringify({ data }),
    });
  } catch (error) {
    console.error(error);
    return setCorsHeaders({
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    });
  } finally {
    // Close MongoDB connection
    if (client) {
      await client.close();
    }
  }
};

const handler = async (event) => {
  try {
    const { screenercode } = event.queryStringParameters;
    const result = await tlsscreener(screenercode);

    return setCorsHeaders({
      statusCode: result.statusCode || 200,
      body: process.env.data15,
    });
  } catch (error) {
    console.error(error);
    return setCorsHeaders({
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    });
  }
};

module.exports = { handler };
