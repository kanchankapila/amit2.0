const MongoClient = require('mongodb').MongoClient;

exports.handler = async function(event, context) {
  const uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
  const dbName = 'MC';
  const collectionName = 'mcinsights';

  const pipelines = [
    {
      name: 'longbuildup',
      pipeline: [
        { $unwind: '$output' },
        { $match: { 'output.FnO.shortDesc': 'F&O data suggests Long Buildup today' } },
        { $project: { Name: '$output.Name', shortDesc: '$output.FnO.shortDesc' } }
      ]
    },
    {
      name: 'longunwinding',
      pipeline: [
        { $unwind: '$output' },
        { $match: { 'output.FnO.shortDesc': 'F&O data suggests Long Unwinding today' } },
        { $project: { Name: '$output.Name', shortDesc: '$output.FnO.shortDesc' } }
      ]
    },
    {
      name: 'shortcovering',
      pipeline: [
        { $unwind: '$output' },
        { $match: { 'output.FnO.shortDesc': 'F&O data suggests Short covering today' } },
        { $project: { Name: '$output.Name', shortDesc: '$output.FnO.shortDesc' } }
      ]
    },
    {
      name: 'shortbuildup',
      pipeline: [
        { $unwind: '$output' },
        { $match: { 'output.FnO.shortDesc': 'F&O data suggests Short Buildup today' } },
        { $project: { Name: '$output.Name', shortDesc: '$output.FnO.shortDesc' } }
      ]
    }
  ];

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);

    const pipelineResults = await Promise.all(pipelines.map(async ({ name, pipeline }) => ({
      name,
      results: await db.collection(collectionName).aggregate(pipeline).toArray()
    })));

    client.close();

    const responseBody = pipelineResults.reduce((acc, { name, results }) => ({
      ...acc,
      [name]: results
    }), {});

    const response = {
      statusCode: 200,
      body: JSON.stringify(responseBody)
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
