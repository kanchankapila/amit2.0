
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);
const fetch = require('node-fetch')



const Opstra = async (eqsymbol,event, context) => {
  try {
    
 
   
     
    

    const response = await client.db('Opstracookie').collection("cookie").find({ }).toArray(); 
    
    
    process.env.data7 = JSON.stringify({ response });
    
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
  
   
    
    
    
        
     

    
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
    
  }
 
}
const handler = async (event) => {

   const eqsymbol = (event.queryStringParameters.stock);
 
  await Opstra(eqsymbol);
  

 return {
   statusCode: 200,
   body: process.env.data7,
  
 
 };
};


module.exports = { handler }


