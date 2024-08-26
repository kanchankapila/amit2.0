const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGODB_ATLAS_CLUSTER_URI; // MongoDB Atlas connection URI
  const dbName = 'NTVOLUME'; // Replace with your actual DB name
  const collectionName = 'volume'; // Replace with your actual collection name

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Aggregation query to filter documents where ratio > 1 and change_percent > 0
    const result = await collection.aggregate([
      {
        $match: {
          'data.ratio': { $gt: 1 },
          'data.change_percent': { $gt: 0 }
        }
      },
      {
        $project: {
          symbol: '$data.symbol_name',
          open: { $toDouble: '$data.open' },
          high: { $toDouble: '$data.high' },
          low: { $toDouble: '$data.low' },
          close: { $toDouble: '$data.close' },
          ratio: { $toDouble: '$data.ratio' },
          last_trade_price: { $toDouble: '$data.last_trade_price' },
          volume: { $toDouble: '$data.volume' },
          avg_daily_volume: { $toDouble: '$data.avg_daily_volume' },
          total_volume: { $toDouble: '$data.total_volume' },
          change: { $toDouble: '$data.change' },
          change_percent: { $toDouble: '$data.change_percent' },
          high52: { $toDouble: '$data.high52' },
          low52: { $toDouble: '$data.low52' }
        }
      }
    ]).toArray();

    // Get the time field from the first document in the collection
    const timeDoc = await collection.findOne({}, { projection: { time: 1 } });
    const time = timeDoc ? timeDoc.time : null;

    // Close the MongoDB client connection
    await client.close();

    // Return the result
    return {
      statusCode: 200,
      body: JSON.stringify({
        body: result,
        time: time
      })
    };
  } catch (error) {
    console.error('Error occurred while querying data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error occurred while querying data from MongoDB',
        details: error.message
      }),
    };
  }
};
