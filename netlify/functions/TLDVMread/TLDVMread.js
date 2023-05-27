const { Pool } = require('pg');

exports.handler = async function(event, context) {
  const pool = new Pool({
    connectionString: process.env.POSTGRESS_DATABASE_URL1, // Update with your PostgreSQL connection URL
  });

  const dbName = 'DVM'; // Update with your database name
  const tableName = 'DVM'; // Update with your table name

  try {
    const client = await pool.connect();
    console.log('Connected successfully to PostgreSQL');

    // Execute query to fetch data
    const query = `
      SELECT obj_item->>'Name' AS Name, (obj_item->>'DurabilityScore')::numeric AS DurabilityScore, (obj_item->>'MomentumScore')::numeric AS MomentumScore, (obj_item->>'VolatilityScore')::numeric AS VolatilityScore
      FROM ${tableName}, jsonb_array_elements(${tableName}.obj) AS obj_item
      WHERE (obj_item->>'DurabilityScore')::numeric > '55'
        AND (obj_item->>'MomentumScore')::numeric > '60'
        AND (obj_item->>'VolatilityScore')::numeric > '50'
    `;
    const result = await client.query(query);
    const time = await client.query(`SELECT time FROM ${tableName} LIMIT 1`);
    

    console.log('Aggregation query result:', result.rows);
    console.log('Time:', time.rows[0].time);
    await client.end();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        body: result.rows,
        time: time.rows[0].time
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
