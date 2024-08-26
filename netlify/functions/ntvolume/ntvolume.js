const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGODB_ATLAS_CLUSTER_URI; // MongoDB Atlas connection URI
  const dbName = 'NTVOLUME'; // Replace with your actual DB name
  const collectionName = 'volume'; // Replace with your actual collection name

  try {
    const start = Date.now();

    // Dynamically import node-fetch using import()
    const fetch = (await import('node-fetch')).default;

    // API endpoint URL
    const apiUrl = 'https://webapi.niftytrader.in/webapi/Resource/nse-break-out-data';

    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Delete existing data from the collection
    await collection.deleteMany({});

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result === 1) {
      const resultData = data.resultData;

      // Prepare the documents to be inserted
      const documents = resultData.map((item, index) => ({
        data: item,
        time: new Date(start + index * 1000)
      }));

      // Insert the documents into the MongoDB collection
      await collection.insertMany(documents);

      console.log('Data updated successfully');
      
      // Close the MongoDB client connection
      await client.close();

      return {
        statusCode: 200,
        body: 'Data stored successfully in MongoDB',
      };
    } else {
      return {
        statusCode: 500,
        body: 'API response does not match expected format',
      };
    }
  } catch (error) {
    console.log('Error while fetching data:', error);

    return {
      statusCode: 500,
      body: 'Error occurred while storing data in MongoDB',
    };
  }
};
