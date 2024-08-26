const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  try {
    const uri = process.env.MONGODB_ATLAS_CLUSTER_URI; // Update with your MongoDB Atlas connection string
    const dbName = 'Tickertape'; // Update with your database name
    const collectionName = 'Volume'; // Update with your collection name

    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log('Connected successfully to MongoDB');

    // Perform aggregation query
    const aggregationPipeline = [
      { $unwind: '$obj' }, // Unwind the array
      { $match: { 'obj.volBreakout': { $gt: 600 } } }, // Match documents with volBreakout > 600
      {
        $project: {
          sid: '$obj.sid',
          Name: '$obj.Name',
          volBreakout: { $toDouble: '$obj.volBreakout' },
        },
      },
    ];

    const result = await collection.aggregate(aggregationPipeline).toArray();

    // Fetch the "time" field from the collection
    const timeDoc = await collection.findOne({}, { projection: { time: 1 } });
    const time = timeDoc ? timeDoc.time : null;

    // Close the MongoDB connection
    await client.close();

    console.log('Aggregation query result:', result);
    console.log('Time:', time);

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: result,
        time: time
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
