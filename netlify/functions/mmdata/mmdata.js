const axios = require('axios');
const mmdata = async (stockid) => {
  try{
  const mmdatafetch  = await axios.get('https://www.trading80.com/technical_card/getCardInfo?sid=' + stockid + '&se=bse&cardlist=sectPrice_techScore,sectPrice_indiScale,sectIndigraph_graph,sectMacd_macd_w,sectRsi_rsi_w,sectBb_bb_w,sectMa_ma_w,sectKst_kst_w,sectDow_dow_w,sectObv_obv_w', {
  headers: {


    "accept": "application/json, text/javascript, */*; q=0.01",
    

  }
});
  

  const mmdataresponse = mmdatafetch.data;
    process.env.mmd = JSON.stringify({ mmdataresponse });

    return {
      statusCode: 200,
      body: process.env.mmd,
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
    const { stockid } = event.queryStringParameters;
    const result = await mmdata(stockid);

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

