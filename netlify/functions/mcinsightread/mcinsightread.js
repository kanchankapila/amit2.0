

const MongoClient = require('mongodb').MongoClient;

exports.handler = async function(event, context) {
  // Connection URL
  const url = process.env.MONGODB_ATLAS_CLUSTER_URI; // Update with your MongoDB connection URL
  const dbName = 'Tickertape'; // Update with your database name
  const collectionName = 'Volume'; // Update with your collection name

  try {
    const client = await MongoClient.connect(url);
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);

    // Aggregation pipeline
    const pipeline = [
      { $match: { "obj.volBreakout": { $gt: 500 } } },
      { $project: { obj: { $filter: { input: "$obj", as: "o", cond: { $gt: ["$$o.volBreakout", 500] } } } } }
    ];

    // Execute aggregation query
    const result = await db.collection(collectionName).aggregate(pipeline).toArray();
    const time = await client.db('Tickertape').collection("Volume").findOne({}, { projection: { _id: 0, time: 1 } }); 
    await client.close();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        body: result,
        time: time
      })
    };
     return response;
    
   

   

   
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
