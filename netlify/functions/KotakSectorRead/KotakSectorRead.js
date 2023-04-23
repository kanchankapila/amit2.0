///Used for providing Sector Id for stocks in same sector in share.component.ts
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);
const fetch = require('node-fetch')



const KotakSector = async (sector,event, context) => {
  try {
    
 
   
     
    

    const response = await client.db('KotakScore').collection("KotakScore").find({ SectorId : sector  }).toArray(); 
    
   
    process.env.data5 = JSON.stringify({ response });
    
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
    await client.close()
  }
 
}
const handler = async (event) => {

   const sector = parseInt(event.queryStringParameters.sector);
 
  await KotakSector(sector);
  

 return {
   statusCode: 200,
   body: process.env.data5,
  
 
 };
};


module.exports = { handler }


