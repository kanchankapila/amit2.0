const { MongoClient } = require('mongodb');
const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI, { useUnifiedTopology: true });
 
const fetch = require('node-fetch')

const opstra1 = async (eqsymbol) => {
  try {
    await client1.connect();
    const jsessionid = await client1.db('Opstracookie').collection("cookie").findOne({}, { projection: { _id: 0, jsessionid: 1 } }); 
   
  //  console.log(process.env.jsess['jsessionid'])
    const response1 = await fetch("https://opstra.definedge.com/api/futures/pcrintra/chart/"+eqsymbol, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
         
          "cookie": `_ga=GA1.2.747701652.1663270048; _gid=GA1.2.422693227.1669215741;JSESSIONID=${jsessionid['jsessionid']}; _gat=1;`, 
            
        },
        "body": null,
        "method": "GET"
      }
       
      )
     
    if (!response1.ok) {
      return { statusCode: response1.status, body: response1.statusText };
    }
   
    const data1 = await response1.json();
    let compressedData1 = JSON.stringify({ data1 });
    compressedData1 = compressedData1.replace(/\s/g, ""); // this line removes whitespace 
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
const handler = async (event) => {
  const { eqsymbol } = event.queryStringParameters;

  await opstra1( eqsymbol);
  // 
  return {
    statusCode: 200,
    body:process.env.opstra1
  };
};

module.exports = { handler };

      
     
    