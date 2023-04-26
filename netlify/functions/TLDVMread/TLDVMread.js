const MongoClient = require('mongodb').MongoClient;

exports.handler = async function(event, context) {
  // Connection URL
  const url = process.env.MONGODB_ATLAS_CLUSTER_URI; // Update with your MongoDB connection URL
  const dbName = 'DVM'; // Update with your database name
  const collectionName = 'DVM'; // Update with your collection name

  try {
    const client = await MongoClient.connect(url,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      });
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    
    // const time = await db.collection(collectionName).findOne({time}).toArray();
    // Aggregation pipeline
    const pipeline = [
      { $match: { "output.DurabilityScore": { $gt: 55 }, "output.MomentumScore": { $gt: 60 }, "output.VolatilityScore": { $gt: 50 } } },
      { $project: { output: { $filter: { input: "$output", as: "o", cond: { $and: [{ $gt: ["$$o.DurabilityScore", 55] }, { $gt: ["$$o.MomentumScore", 60] }, { $gt: ["$$o.VolatilityScore", 50] }] } } } } }
    ];

    // Execute aggregation query
    const result = await db.collection(collectionName).aggregate(pipeline).toArray();
    
     const time = await client.db('DVM').collection("DVM").findOne({}, { projection: { _id: 0, time: 1 } }); 
    await client.close();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        body: result,
        time: time
      })
    };
     return response;
    // const response= {
    //   statusCode: 200,
    //   body: JSON.stringify({result,time})
     
      
    // };
    // return response;
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
