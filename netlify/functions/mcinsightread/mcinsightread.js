exports.handler = async function (event, context) {
  try {
    const { Client } = await import('pg').then(module => module.default);

    const connectionString = process.env.POSTGRESS_DATABASE_URL;
    const dbName = 'MC';
    const tableName = 'mcinsights';

    const queries = [
      {
        name: 'longbuildup',
        query: `
          SELECT obj_item->'Name' AS Name, obj_item->'FnO'->>'shortDesc' AS shortDesc
          FROM ${tableName} INDEX (fno_idx), jsonb_array_elements(obj) AS obj_item
          WHERE obj_item->'FnO'->>'shortDesc' = 'F&O data suggests Long Buildup today'
        `
      },
      {
        name: 'longunwinding',
        query: `
          SELECT obj_item->'Name' AS Name, obj_item->'FnO'->>'shortDesc' AS shortDesc
          FROM ${tableName}, jsonb_array_elements(obj) AS obj_item
          WHERE obj_item->'FnO'->>'shortDesc' = 'F&O data suggests Long Unwinding today'
        `
      },
      {
        name: 'shortcovering',
        query: `
          SELECT obj_item->'Name' AS Name, obj_item->'FnO'->>'shortDesc' AS shortDesc
          FROM ${tableName}, jsonb_array_elements(obj) AS obj_item
          WHERE obj_item->'FnO'->>'shortDesc' = 'F&O data suggests Short covering today'
        `
      },
      {
        name: 'shortbuildup',
        query: `
          SELECT obj_item->'Name' AS Name, obj_item->'FnO'->>'shortDesc' AS shortDesc
          FROM ${tableName}, jsonb_array_elements(obj) AS obj_item
          WHERE obj_item->'FnO'->>'shortDesc' = 'F&O data suggests Short Buildup today'
        `
      }
    ];

    const client = new Client({ connectionString });
    await client.connect();

    const queryResults = await Promise.all(queries.map(async ({ name, query }) => ({
      name,
      results: await client.query(query)
    })));

    await client.end();

    const responseBody = queryResults.reduce((acc, { name, results }) => ({
      ...acc,
      [name]: results.rows
    }), {});

    // Get the time value separately
    const client2 = new Client({ connectionString });
    await client2.connect();
    const timeQuery = `SELECT time FROM ${tableName} LIMIT 1`;
    const timeResult = await client2.query(timeQuery);
    const time = timeResult.rows.length > 0 ? timeResult.rows[0].time : null;
    await client2.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        body: responseBody,
        time: time
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
