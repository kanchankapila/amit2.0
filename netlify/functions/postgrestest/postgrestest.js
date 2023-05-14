const { Pool } = require('pg');

exports.handler = async (event, context) => {
    console.log(process.env.POSTGRESS_DATABASE_URL)
  const pool = new Pool({
    connectionString: process.env.POSTGRESS_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM mcinsight');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Internal server error'
    };
  } finally {
    await pool.end();
  }
};

