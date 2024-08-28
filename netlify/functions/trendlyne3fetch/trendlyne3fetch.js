const axios = require('axios');

const apiUrl = process.env.mongoapiurl;
const apiKey = process.env.mongoapikey; // Your MongoDB Data API key
const database = 'Trendlynecookie';
const collection = 'cookie';
const trendlyneindex = async (tlid) => {
  try {
    const query = {
      collection,
      database,
      dataSource: 'Cluster0', // Replace with your MongoDB cluster name
      filter: {},
    };
  
    const response = await axios.post(apiUrl, query, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      }
    });
  
    const { documents } = response.data;
    const { csrf, time, trnd } = documents[0]; // Assuming you have at least one document
    // Print CSRF and TRND values
    console.log('CSRF Token:', csrf);
    console.log('TRND Value:', trnd);
        // Fetch data from Trendlyne API using screenercode
        const fetchResponse =  await axios.get(`https://trendlyne.com/equity/getStockMetricParameterList/${tlid}`, {
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
             "cookie": `_ga=GA1.1.1667715230.1722073196;_ga_J2YW7VJGYP=GS1.1.1724684711.1.1.1724684877.0.0.0; TLCDay=0; .trendlyne=${trnd}; csrftoken=${csrf}; _ga_7F29Q8ZGH0=GS1.1.1724866742.14.1.1724867918.10.0.0`,
          },
          "referrer": "https://trendlyne.com/equity/BEL/bharat-electronics-ltd/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          
          "mode": "cors",
          "credentials": "include"
        }
        )

        const dataindx = fetchResponse.data;
        process.env.trendlyneindx1 = JSON.stringify({ dataindx });
    
        return {
          statusCode: 200,
          body: process.env.trendlyneindx1,
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: error.message }),
        };
      }
    };
    
    
    exports.handler = async (event, context) => {
      try {
        const { tlid } = event.queryStringParameters;
        const result = await trendlyneindex(tlid);
    
        return {
          statusCode: 200,
          body: result.body,
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: 'Internal server error' }),
        };
      }
    };