const { MongoClient } = require('mongodb');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);

const opstraintra = async (eqsymbol) => {
  try {
    await client1.connect();
    const jsessionid = await client1.db('Opstracookie').collection('cookie').findOne({}, { projection: { _id: 0, jsessionid: 1 } });
    const dsessionid = await client1.db('Opstracookie').collection('cookie').findOne({}, { projection: { _id: 0, dsessionid: 1 } });
    console.log(jsessionid)
    console.log(dsessionid)
    const response = await fetch(`https://opstra.definedge.com/api/futures/pcrintra/chart/${eqsymbol}`, {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'cookie':'_ga=GA1.1.185892821.1752692522; DSESSIONID=${dsessionid.dsessionid}; _ga_6D0ZQ437SD=GS2.1.s1752692521$o1$g1$t1752693310$j60$l0$h0; JSESSIONID=${jsessionid.jsessionid}'
        // `_ga=GA1.1.809222793.1724492013; _ga_50VZ2CLHRH=GS1.1.1724575021.1.1.1724575050.0.0.0; JSESSIONID=${jsessionid.jsessionid}; _ga_6D0ZQ437SD=GS1.1.1726029893.7.1.1726029945.0.0.0`,
        // `_ga=GA1.2.747701652.1663270048; _gid=GA1.2.422693227.1669215741; JSESSIONID=${jsessionid.jsessionid}; _gat=1;`,
      },
      method: 'GET',
      body: null,
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data1 = await response.json();
    let compressedData1 = JSON.stringify({ data1 });
    compressedData1 = compressedData1.replace(/\s/g, ''); // Remove whitespace from JSON string
    process.env.opstra1 = compressedData1;

    return {
      statusCode: 200,
      body: process.env.opstra1,
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

exports.handler = async (event) => {
  const { eqsymbol } = event.queryStringParameters;
  await opstraintra(eqsymbol);

  return {
    statusCode: 200,
    body: process.env.opstra1,
  };
};
