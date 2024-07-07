const { Pool } = require('pg');
const { default: fetch } = require('node-fetch');

const pool = new Pool({
  connectionString: process.env.POSTGRESS_DATABASE_URL1,
  ssl: {
    rejectUnauthorized: false,
  },
});

const trendlyne = async (tlid, tlname, eqsymbol) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query('SELECT csrf, time, trnd FROM cookie');
    const rows = result.rows;
    for (const row of rows) {
      const { csrf, time, trnd } = row;
      process.env.csrf = csrf;
      process.env.trnd = trnd;
      process.env.time = time;
    }

    const response = await fetch(`https://trendlyne.com/equity/getStockMetricParameterList/${tlid}`, {
      method: 'GET',
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": `_gid=GA1.2.437560219.1668751717; .trendlyne=${process.env.trnd}; csrftoken=${process.env.csrf}; __utma=185246956.775644955.1603113261.1614010114.1614018734.3; _ga=GA1.2.1847322061.1668751717; _gat=1`,
      },
      referrer: `https://trendlyne.com/equity/${tlid}/${eqsymbol}/${tlname}/`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      mode: "cors",
      credentials: "include"
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    await client.release();
    const data = await response.json();
    let compressedData = JSON.stringify({ data });
    compressedData = compressedData.replace(/\s/g, ""); // Remove whitespace
    process.env.trendlyne = compressedData;
    return {
      statusCode: 200,
      body: process.env.trendlyne,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
    if (client) {
      client.release();
    }
  }
};

const handler = async (event) => {
  const { tlid, tlname, eqsymbol } = event.queryStringParameters;
  await trendlyne(tlid, tlname, eqsymbol);
  return {
    statusCode: 200,
    body: process.env.trendlyne,
  };
};

module.exports = { handler };
