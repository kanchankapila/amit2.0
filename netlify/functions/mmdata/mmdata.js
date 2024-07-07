exports.handler = async (event, context, callback) => {
  try {
    const fetch = await import('node-fetch').then(module => module.default);

    const mmdatafetch = async (stockid) => {
      try {
        const response = await fetch('https://www.trading80.com/technical_card/getCardInfo?sid=' + stockid + '&se=bse&cardlist=sectPrice_techScore,sectPrice_indiScale,sectIndigraph_graph,sectMacd_macd_w,sectRsi_rsi_w,sectBb_bb_w,sectMa_ma_w,sectKst_kst_w,sectDow_dow_w,sectObv_obv_w', {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          return { statusCode: response.status, body: response.statusText };
        }

        const data = await response.json();
        process.env.data6 = JSON.stringify({ data });

        return {
          statusCode: 200,
          body: JSON.stringify({ data }),
        };
      } catch (error) {
        console.log(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: error.message }),
        };
      }
    };

    const stockid = event.queryStringParameters.stockid;
    const fetchResponse = await mmdatafetch(stockid);

    return {
      statusCode: 200,
      body: process.env.data6,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

module.exports = { handler };
