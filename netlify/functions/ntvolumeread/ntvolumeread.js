const { Client } = require('pg');

exports.handler = async (event, context) => {
  const client = new Client({ connectionString: process.env.POSTGRESS_DATABASE_URL1 });

  try {
    await client.connect();

    const tableName = 'NTVOLUME';

    // Retrieve data for symbols with ratio greater than 1 and positive change_percent
    const query = `
      SELECT
        data->>'symbol_name' AS symbol,
        (data->>'open')::float AS open,
        (data->>'high')::float AS high,
        (data->>'low')::float AS low,
        (data->>'close')::float AS close,
        (data->>'ratio')::float AS ratio,
        (data->>'last_trade_price')::float AS last_trade_price,
        (data->>'volume')::float AS volume,
        (data->>'avg_daily_volume')::float AS avg_daily_volume,
        (data->>'total_volume')::float AS total_volume,
        (data->>'change')::float AS change,
        (data->>'change_percent')::float AS change_percent,
        (data->>'high52')::float AS high52,
        (data->>'low52')::float AS low52
      FROM ${tableName}
      WHERE (data->>'ratio')::float > 1 AND (data->>'change_percent')::float > 0
    `;

    const result = await client.query(query);
    const time = await client.query(`SELECT time FROM ${tableName} LIMIT 1`);
    console.log('Time:', time.rows[0].time);
    const data = result.rows;

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
      body: (data),
      time: time.rows[0].time
      })
    };
  } catch (error) {
    console.log('Error occurred while querying data:', error);

    await client.end();

    return {
      statusCode: 500,
      body: 'Error occurred while querying data from PostgreSQL',
    };
  }
};
