
const fetch = require('node-fetch');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.POSTGRESS_DATABASE_URL, // Replace with your PostgreSQL database connection string
  ssl: {
    rejectUnauthorized: false, // Only set this option if using a self-signed certificate
  },
});



const trendlynebuildup5 = async ( event, context) => {
  try {
    const client = await pool.connect();
   
      const result = await client.query('SELECT csrf, time, trnd FROM cookie ');
      const rows = result.rows;
      for (const row of rows) {
        const { csrf, time, trnd } = row;
        process.env.csrf=csrf
        process.env.trnd=trnd
        process.env.time=time
      
      };
    const response1 = await fetch("https://api.moneycontrol.com/mcapi/v1/fno/futures/getExpDts?id=IDF01");
    if (!response1.ok) {
      return { statusCode: response1.status, body: response1.statusText };
    }
    const value = await response1.json();
    const dateString = value['data'][0]['exp_date'];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const response = await fetch(`https://trendlyne.com/futures-options/api/heatmap/${formattedDate}-near/all/price/`, {
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_gid=GA1.2.1330229069.1671722517; g_state={\"i_l\":0}; csrftoken="+process.env.csrf+"; .trendlyne="+process.env.trnd+"; _gat=1; _ga_7F29Q8ZGH0=GS1.1.1671722518.6.1.1671722626.0.0.0; AWSALB=7RplLmOAQ47mXZ/TMrgzOcUsq1dWrX5lk93GPzw7lpnPfQHeKd+rHhAzYOVPnDtcvYSu3ZtvVl7BSruOVfjlTjZn+Qbn8uvgIOzQ1h4mE+yUA0aF9Wq5Bk4LLsj+; AWSALBCORS=7RplLmOAQ47mXZ/TMrgzOcUsq1dWrX5lk93GPzw7lpnPfQHeKd+rHhAzYOVPnDtcvYSu3ZtvVl7BSruOVfjlTjZn+Qbn8uvgIOzQ1h4mE+yUA0aF9Wq5Bk4LLsj+; _ga=GA1.2.521023439.1671467978",
        "Referer": `https://trendlyne.com/futures-options/api/heatmap/${formattedDate}-near/all/price/`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    await client.release();
    const tlbuildup = await response.json();

    process.env.trendlynebuildup5 = JSON.stringify({ tlbuildup });
    return {
      statusCode: 200,
      body: process.env.trendlynebuildup5,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
   
  }
}

const handler = async (event) => {

  const result = await trendlynebuildup5();
  return {
    statusCode: result.statusCode,
    body: result.body,
  };
};

module.exports = { handler };
