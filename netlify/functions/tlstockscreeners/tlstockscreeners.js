
const { MongoClient } = require('mongodb');

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
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    process.env.data15 = JSON.stringify({ data });

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

    return {
      statusCode: result.statusCode || 200,
      body: process.env.data15,
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
