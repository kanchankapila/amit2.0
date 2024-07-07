exports.handler = async (event, context) => {
  try {
    const { Pool } = await import('pg').then(module => module.default);
    const fetch = await import('node-fetch').then(module => module.default);

    const pool = new Pool({
      connectionString: process.env.POSTGRESS_DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const trendlyneindex = async (indexid, duration) => {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT csrf, time, trnd FROM cookie');
        const rows = result.rows;
        for (const row of rows) {
          const { csrf, time, trnd } = row;
          process.env.csrf = csrf;
          process.env.trnd = trnd;
          process.env.time = time;
        }

        const response = await fetch(`https://trendlyne.com/mapp/v1/stock/adv-technical-analysis/${indexid}/${duration}/`, {
          method: 'GET',
          headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": `_gid=GA1.2.437560219.1668751717;.trendlyne=${process.env.trnd}; csrftoken=${process.env.csrf}; __utma=185246956.775644955.1603113261.1614010114.1614018734.3; _ga=GA1.2.1847322061.1668751717; _gat=1`,
            "Referer": "https://trendlyne.com/equity/technical-analysis/NIFTY50/1887/nifty-50/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          body: null,
          method: "GET"
        });

        if (!response.ok) {
          return { statusCode: response.status, body: response.statusText };
        }

        await client.release();
        const dataindx = await response.json();
        process.env.trendlyneindx = JSON.stringify({ dataindx });

        return {
          statusCode: 200,
          body: process.env.trendlyneindx,
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: error.message }),
        };
      } finally {
        // Clean up or final tasks if needed
      }
    };

    const { indexid, duration } = event.queryStringParameters;
    await trendlyneindex(indexid, duration);

    return {
      statusCode: 200,
      body: process.env.trendlyneindx,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Internal server error' }),
    };
  }
};
