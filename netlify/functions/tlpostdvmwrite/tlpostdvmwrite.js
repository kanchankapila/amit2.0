const fetch = require('node-fetch');
const axios = require('axios');

const axiosApiInstance = axios.create({
  baseURL: process.env.mongoapiurl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.mongoapikey,
    Accept: 'application/ejson'
  }
});

const trendlyne = async (tlid) => {
  const obj = [];

  try {
    const urls = JSON.parse(tlid);
    const start = Date.now();

    for (const urlEle of urls) {
      const response = await fetch(
        `https://trendlyne.com/mapp/v1/stock/chart-data/${urlEle.tlid}/SMA/?format=json`,
        {
          headers: { Accept: 'application/json' }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data1 = await response.json();

      obj.push({
        Date: urlEle.Date,
        Time: urlEle.time,
        Name: urlEle.name,
        DurabilityScore: data1.body['stockData'][6],
        DurabilityColor: data1.body['stockData'][9],
        VolatilityScore: data1.body['stockData'][7],
        VolatilityColor: data1.body['stockData'][10],
        MomentumScore: data1.body['stockData'][8],
        MomentumColor: data1.body['stockData'][11]
      });

      // Post data to MongoDB using axios
      await axiosApiInstance.post('/updateOne', {
        collection: 'DVM',
        database: 'DVM',
        dataSource: 'Cluster0',
        filter: {},
        update: {
          $set: {
            output: obj,
            time: start
          }
        },
        upsert: true
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ data: obj })
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  }
};

const handler = async (event) => {
  try {
    const tlid = event.body;

    await trendlyne(tlid);

    return {
      statusCode: 200,
      body: JSON.stringify({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        }
      })
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  }
};

module.exports = { handler };
