// netlify/functions/fetchStockReport.js
// const fetch =  import('node-fetch').then(module => module.default);

exports.handler = async function (event, context) {
  const url = "https://screener.indiatimes.com/screener/stockReportAllTabs";
  const bodyData = {
    apiType: "overview",
    filterType: "index",
    deviceId: "web",
    filterValue: []
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      referrer: "https://m.economictimes.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify(bodyData),
      mode: "cors",
      credentials: "omit"
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch stock report" })
    };
  }
};
