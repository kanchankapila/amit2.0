const fetch = require('node-fetch');
const axios=require('axios')
const axiosApiInstance = axios.create({
  baseURL: 'https://data.mongodb-api.com/app/data-cibaq/endpoint/data/v1/action',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy ',
    Accept: 'application/ejson'
  }
});
const trendlyne = async (tlid) => {
  const obj = [];

  try {
    url = JSON.parse(tlid);
    const start = Date.now();

    for (const urlEle of url) {
      const response = await fetch(
        `https://trendlyne.com/mapp/v1/stock/chart-data/${urlEle.tlid}/SMA/?format=json`,
        {
          headers: { Accept: 'application/json' }
        }
      );
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
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    };
  }
};
// here I've removed event, context and callback as they are not being used.
const handler = async (event) => {
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
};

module.exports = { handler };