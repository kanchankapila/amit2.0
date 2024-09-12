const { MongoClient } = require('mongodb');

const handler = async function (event) {
  try {
    // Dynamic import of 'node-fetch'
    const fetch = await import('node-fetch').then(module => module.default);

    // MongoDB connection details
    const uri = process.env.MONGODB_ATLAS_CLUSTER_URI;
    const dbName = 'Trendlyne'; // Update with your database name
    const collectionName = 'cookie'; // Update with your collection name
    let client;

    const trendlynebuildup5 = async (tlid) => {
      client = await MongoClient.connect(uri);
      console.log('Connected successfully to MongoDB');
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      try {
        // Retrieve CSRF token and other necessary data from MongoDB
        const rows = await collection.find().toArray();
        for (const row of rows) {
          const { csrf, time, trnd } = row;
          process.env.csrf = csrf;
          process.env.trnd = trnd;
          process.env.time = time;
        }



        // Fetch expiration date for futures
        const response1 = await fetch("https://api.moneycontrol.com/mcapi/v1/fno/futures/getExpDts?id=IDF01");
        if (!response1.ok) {
          return { statusCode: response1.status, body: response1.statusText };
        }
        const value = await response1.json();
        const dateString = value.data[0].exp_date;
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        // Fetch data from Trendlyne API
        const response = await fetch(`https://trendlyne.com/futures-options/api/heatmap/${formattedDate}-near/all/price/`, {
          method: 'GET',
          headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": `_ga=GA1.1.1667715230.1722073196; _ga_J2YW7VJGYP=GS1.1.1724684711.1.1.1724684877.0.0.0; _ga_8MLP1KVCSX=GS1.1.1724910003.1.0.1724910003.0.0.0; _clck=l9t1r7%7C2%7Cfoq%7C0%7C1702; TLCDay=0; TLCWeek=0;csrftoken=${process.env.csrf};.trendlyne=${process.env.trnd}; _ga_7F29Q8ZGH0=GS1.1.1726064901.26.1.1726066721.60.0.0`,
            "Referer": "https://trendlyne.com/",
            "Referrer-Policy": "origin"
          }
        });

        if (!response.ok) {
          return { statusCode: response.status, body: response.statusText };
        }

        const tlbuildup5 = await response.json();

        process.env.trendlynebuildup5 = JSON.stringify({ tlbuildup5 });
        return {
          statusCode: 200,
          body: process.env.trendlynebuildup5,
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: error.message }),
        };
      } finally {
        // Ensure client is released in case of errors
        if (client) {
          await client.close();
        }
      }
    };

    const result = await trendlynebuildup5();
    return {
      statusCode: result.statusCode || 200,
      body: result.body,
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
