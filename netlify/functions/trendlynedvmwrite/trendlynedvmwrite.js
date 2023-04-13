const axios = require('axios');
const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
  const uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db('<DATABASE_NAME>');
  const collection = db.collection('<COLLECTION_NAME>');

  const { objects } = JSON.parse(event.body);

  const results = [];

  for (const obj of objects) {
    const url = `https://example.com/${obj.param}`;

    const response = await axios.get(url);

    const data = {
      ...obj,
      output: response.data,
    };

    const result = await collection.insertOne(data);
    results.push(result);
  }

  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ results }),
  };
};