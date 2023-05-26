const { Client } = require('pg');

exports.handler = async function(event, context) {
  const connectionString = process.env.POSTGRESS_DATABASE_URL; // Update with your PostgreSQL connection string
  const dbName = 'Tickertape'; // Update with your database name
  const tableName = 'Volume'; // Update with your table name

  try {
    const client = new Client({ connectionString });
    await client.connect();
    console.log('Connected successfully to PostgreSQL');

    const query = `
    SELECT obj_item->>'sid' AS sid, obj_item->>'Name' AS Name, (obj_item->>'volBreakout')::numeric AS volBreakout
    FROM ${tableName} ,
        jsonb_array_elements(${tableName}.obj) AS obj_item
    WHERE (obj_item->>'volBreakout')::numeric > 600;
  `;

    const result = await client.query(query);
    const time = await client.query(`SELECT time FROM ${tableName} LIMIT 1`);
    await client.end();

    console.log('Aggregation query result:', result.rows);
    console.log('Time:', time.rows[0].time);

    // Process the query result and time if needed

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: result.rows,
        time: time.rows[0].time
      })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
