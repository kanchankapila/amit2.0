// netlify/functions/nifty.js

exports.handler = async function(event, context) {
  // Example: fetch data from an external API or database here
  // For now, return a static response
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: 'Nifty 50',
      price: 22500.00,
      change: 50.25,
      changePercent: 0.22,
      volume: 1000000,
      advances: 30,
      declines: 18,
      unchanged: 2,
      lastUpdated: new Date().toISOString(),
      components: [
        {
          symbol: 'RELIANCE',
          name: 'Reliance Industries',
          price: 2500,
          change: 10,
          changePercent: 0.4,
          volume: 500000,
          marketCap: 1500000000,
          pe: 25,
          sector: 'Energy',
          industry: 'Oil & Gas'
        }
        // Add more mock stocks as needed
      ]
    })
  };
};
