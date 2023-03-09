
const { MongoClient } = require('mongodb');
const client1 = new MongoClient(process.env.MONGODB_ATLAS_CLUSTER_URI);

const fetch = require('node-fetch')





const trendlyneindex =  async (indexid,duration,event, context) => {
 
  
  try {
    await client1.connect();
    const csrf = await client1.db('Trendlynecookie').collection("cookie").find({},{ projection: { _id: 0, csrf: 1 } }).toArray(); 
    const trnd = await client1.db('Trendlynecookie').collection("cookie").find({},{ projection: { _id: 0, trnd: 1 } }).toArray(); 
   
    
    const response = await fetch('https://trendlyne.com/mapp/v1/stock/adv-technical-analysis/'+indexid+'/'+duration+'/', {
      method: 'GET',
      headers: {
        "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gid=GA1.2.1330229069.1671722517; g_state={\"i_l\":0}; csrftoken="+csrf[0].csrf+"; .trendlyne="+trnd[0].trnd+"; _gat=1; _ga_7F29Q8ZGH0=GS1.1.1671722518.6.1.1671722626.0.0.0; AWSALB=7RplLmOAQ47mXZ/TMrgzOcUsq1dWrX5lk93GPzw7lpnPfQHeKd+rHhAzYOVPnDtcvYSu3ZtvVl7BSruOVfjlTjZn+Qbn8uvgIOzQ1h4mE+yUA0aF9Wq5Bk4LLsj+; AWSALBCORS=7RplLmOAQ47mXZ/TMrgzOcUsq1dWrX5lk93GPzw7lpnPfQHeKd+rHhAzYOVPnDtcvYSu3ZtvVl7BSruOVfjlTjZn+Qbn8uvgIOzQ1h4mE+yUA0aF9Wq5Bk4LLsj+; _ga=GA1.2.521023439.1671467978",
    "Referer": "https://trendlyne.com/equity/technical-analysis/NIFTY50/1887/nifty-50/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }
    )
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const dataindx = await response.json()
    
    process.env.trendlyneindx = JSON.stringify({ dataindx });
    return {
      statusCode: 200,
      body: process.env.trendlyneindx,
     
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }finally {
    
       await client1.close()
    
  }
   



   
  }

  


 const handler = async (event) => {
   const indexid = (event.queryStringParameters.indexid);
   const duration = (event.queryStringParameters.duration);
   
  
   await trendlyneindex(indexid,duration);
   

  return {
    statusCode: 200,
    body: process.env.trendlyneindx,
   
  
  };
};
module.exports = { handler }