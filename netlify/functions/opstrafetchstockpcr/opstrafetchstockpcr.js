const { MongoClient } = require('mongodb');


// const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI, { useUnifiedTopology: true });

const opstra = async (eqsymbol) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);
    // await client1.connect();
    // const jsessionid = await client1.db('Opstracookie').collection('cookie').findOne({}, { projection: { _id: 0, jsessionid: 1 } });

    const response = await fetch(`https://opstra.definedge.com/api/futures/pcr/chart/NIFTY`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "_ga=GA1.1.809222793.1724492013; _ga_50VZ2CLHRH=GS1.1.1724575021.1.1.1724575050.0.0.0; DSESSIONID=C228A80A3F59D6CC0F663F6989F758A0; _ga_6D0ZQ437SD=GS1.1.1724580616.3.1.1724580661.0.0.0; JSESSIONID=A01707B2211AF0BA9D019F5ED00338B1",
        "Referer": "https://opstra.definedge.com/pcr",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    console.log(response)
    let compressedData = JSON.stringify({ data });
    compressedData = compressedData.replace(/\s/g, ''); // Remove whitespace from JSON string
    process.env.opstra = compressedData;

    return {
      statusCode: 200,
      body: process.env.opstra,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  } finally {
    // await client1.close();
  }
};

exports.handler = async (event) => {
  const { eqsymbol } = event.queryStringParameters;
  await opstra(eqsymbol);
 
  return {
    statusCode: 200,
    body: process.env.opstra,
  };
};
