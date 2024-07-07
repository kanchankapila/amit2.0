const fetch = require('node-fetch');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRESS_DATABASE_URL1, // Replace with your PostgreSQL database connection string
  ssl: {
    rejectUnauthorized: false, // Only set this option if using a self-signed certificate
  },
});

const tlsscreener = async (screenercode) => {
  const client = await pool.connect();

  try {
    // Query PostgreSQL for necessary data (csrf, trnd, time)
    const result = await client.query('SELECT csrf, time, trnd FROM cookie');
    const rows = result.rows;
    for (const row of rows) {
      const { csrf, time, trnd } = row;
      process.env.csrf = csrf;
      process.env.trnd = trnd;
      process.env.time = time;
    }

    // Fetch data from Trendlyne API using screenercode
    const response = await fetch(`https://kayal.trendlyne.com/broker-webview/kayal/all-in-one-screener-data-get/?perPageCount=200&pageNumber=0&screenpk=${screenercode}&groupType=all&groupName=`, {
      headers: {
        Accept: 'application/json',
        // Add any necessary headers here
      },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    process.env.data15 = JSON.stringify({ data });

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
    // Release the PostgreSQL client back to the pool
    client.release();
  }
};

const handler = async (event) => {
  try {
    const { screenercode } = event.queryStringParameters;
    const result = await tlsscreener(screenercode);

    return {
      statusCode: result.statusCode || 200,
      body: process.env.data15,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
