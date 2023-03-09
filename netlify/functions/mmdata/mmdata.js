const fetch = require('node-fetch')

const mmdatafetch = async (stockid,event, context,callback) => {
    
  try {
    const response = await fetch('https://www.trading80.com/technical_card/getCardInfo?sid=' + stockid + '&se=bse&cardlist=sectPrice_techScore,sectPrice_indiScale,sectIndigraph_graph,sectMacd_macd_w,sectRsi_rsi_w,sectBb_bb_w,sectMa_ma_w,sectKst_kst_w,sectDow_dow_w,sectObv_obv_w'
   , {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    process.env.data1=JSON.stringify({data})
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
 
  const stockid = (event.queryStringParameters.stockid);
 
  
  await mmdatafetch(stockid);

 return {
   statusCode: 200,
   body: process.env.data1,
  
 
 };
};
module.exports = { handler }


