const { MongoClient } = require('mongodb');
const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI, { useUnifiedTopology: true });

const fetch = require('node-fetch')

const trendlyne = async (tlid, tlname, eqsymbol) => {
  try {
    await client1.connect();
    const csrf = await client1.db('Trendlynecookie').collection("cookie").findOne({}, { projection: { _id: 0, csrf: 1 } }); 
    const trnd = await client1.db('Trendlynecookie').collection("cookie").findOne({}, { projection: { _id: 0, trnd: 1 } }); 
    
     console.log(csrf['csrf']);
    console.log(trnd['trnd']);
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
        "cookie": `_gid=GA1.2.437560219.1668751717;.trendlyne=${trnd['trnd']}; csrftoken=${csrf['csrf']}; __utma=185246956.775644955.1603113261.1614010114.1614018734.3; _ga=GA1.2.1847322061.1668751717; _gat=1`,
      },
      "referrer": `https://trendlyne.com/equity/${tlid}/${eqsymbol}/${tlname}/`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    let compressedData = JSON.stringify({ data });
    compressedData = compressedData.replace(/\s/g, ""); // this line removes whitespace 
    process.env.trendlyne3 = compressedData;
    return {
      statusCode: 200,
      body: process.env.trendlyne3,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
      await client1.close();
  }
};

const handler = async (event) => {
  const { tlid, tlname, eqsymbol } = event.queryStringParameters;
  await trendlyne(tlid, tlname, eqsymbol);
  return {
    statusCode: 200,
    body: process.env.trendlyne3,
  };
};

module.exports = { handler };
