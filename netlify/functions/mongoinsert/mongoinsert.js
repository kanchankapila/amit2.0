// import required dependencies
const axios = require('axios');

// define data variable 
const data = {
    "collection": "cookie",
    "database": "Trendlynecookie",
    "dataSource": "Cluster0",
    "document": {
      "name": "John Sample",
      "age": 43
    }
    };


// define config variable 
const config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-cibaq/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy',
      'Accept': 'application/ejson'
    },
    data,
};

// define serverless function
exports.handler = async (event, context, callback) => {

    // make API call
    try {
        const result = await axios(config);
        
        // return response data
        callback(null, {
            statusCode: 200,
            body: "Inserted"
        });
        
    } catch (err) {
        console.log(err);
        callback(err);
    }
}
