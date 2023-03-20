const fetch = require('node-fetch')

const trendlyne = async (tlid,event, context,callback) => {
  try {
    
   
    
    url=JSON.parse(tlid)
    const results=await Promise.all(url.map(async  url => {
      try{
        console.log(url.tlid)
        const response = await fetch('https://trendlyne.com/mapp/v1/stock/chart-data/' + url.tlid + '/SMA/', {
          headers: { Accept: 'application/json' },
        })
        return{url,data: response.data};
      } catch(error){
        return{url,error:error.message}
      }
    }));
   
    
    if (!results.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: results.status, body: results.statusText }
    }
   
    const data = await results.json()
    console.log(data)
    // process.env.data12=JSON.stringify({data});
    return {
      statusCode: 200,
      body: JSON.stringify({data}),
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
  const tlid = event.body;
 
  await trendlyne(tlid);
  return{
    statusCode:200,
    body:JSON.stringify({
    headers:
      {
      "Access-Control-Allow-Origin":'*',
      "Access-Control-Allow-Credentials":true
    }
  })
  }
};

module.exports = { handler };




