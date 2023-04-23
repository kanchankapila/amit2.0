
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);
const fetch = require('node-fetch')



const KotakScore = async (stock,event, context) => {
  try {
    
 
   
     
    

    const response = await client.db('KotakScore').collection("KotakScore").find({ CompanyShortName:stock }).toArray(); 
    
    
    process.env.data1 = JSON.stringify({ response });
    
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
    
  }finally{
    await client.close()}
 
}
const handler = async (event) => {

   const stock = (event.queryStringParameters.stock);
 
  await KotakScore(stock);
  

 return {
   statusCode: 200,
   body: process.env.data1,
  
 
 };
};


module.exports = { handler }


