const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');

const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);

// Fetch csrf and trnd data outside the function
const csrfPromise = client1
  .connect()
  .then(() => client1.db('Trendlynecookie').collection("cookie").find({}, { projection: { _id: 0, csrf: 1 } }).toArray());
const trndPromise = client1
  .db('Trendlynecookie').collection("cookie").find({}, { projection: { _id: 0, trnd: 1 } }).toArray();

const trendlynebuildup = async (tlid, expdate, event, context) => {
  try {
    const [csrf, trnd] = await Promise.all([csrfPromise, trndPromise]);
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
console.log(csrf[0].csrf)
    const response = await fetch(`https://trendlyne.com/futures-options/api/derivative/buildup-15/${formattedDate}-near/${tlid}/`, {
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
        "cookie": "_gid=GA1.2.1330229069.1671722517; g_state={\"i_l\":0}; csrftoken="+csrf[0].csrf+"; .trendlyne="+trnd[0].trnd+"; _gat=1; _ga_7F29Q8ZGH0=GS1.1.1671722518.6.1.1671722626.0.0.0; AWSALB=7RplLmOAQ47mXZ/TMrgzOcUsq1dWrX5lk93GPzw7lpnPfQHeKd+rHhAzYOVPnDtcvYSu3ZtvVl7BSruOVfjlTjZn+Qbn8uvgIOzQ1h4mE+yUA0aF9Wq5Bk4LLsj+; AWSALBCORS=7RplLmOAQ47mXZ/TMrgzOcUsq1dWrX5lk93GPzw7lpnPfQHeKd+rHhAzYOVPnDtcvYSu3ZtvVl7BSruOVfjlTjZn+Qbn8uvgIOzQ1h4mE+yUA0aF9Wq5Bk4LLsj+; _ga=GA1.2.521023439.1671467978",
        "Referer": `https://trendlyne.com/futures-options/derivative/buildup-15-minutes/${formattedDate}-near/${tlid}/`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const dataindx = await response.json();

    process.env.trendlynebuildup = JSON.stringify({ dataindx });
    return {
      statusCode: 200,
      body: process.env.trendlynebuildup,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
    await client1.close();
  }
}

const handler = async (event) => {
  const tlid = event.queryStringParameters.tlid;
  const result = await trendlynebuildup(tlid);
  return {
    statusCode: result.statusCode,
    body: result.body,
  };
};

module.exports = { handler };
