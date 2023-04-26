const fetch = require("node-fetch");
const axios= require('axios')

const tlstockcl = async function (tlid,event, context,callback) {
  try {
   
   
   
    const response = await axios.get('https://kayal.trendlyne.com/clientapi/kayal/content/checklist-bypk/' + tlid);
    const html = response.data;
    process.env.tlstockcl=html;
    return {
      statusCode: 200,
      body: html,
      headers: {
        'Content-Type': 'text/html'
      }
    };
  }  catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}
const handler = async (event) => {
  const tlid = (event.queryStringParameters.tlid);

  await tlstockcl(tlid);
  

  return {
   statusCode: 200,
   body: process.env.tlstockcl,
  
 
 };
};
module.exports = { handler }
