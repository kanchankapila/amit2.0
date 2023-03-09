const fetch = require('node-fetch')

const handler = async function (event,bqnames,dateday5,datetoday) {
  try {
    const bqnames = event.queryStringParameters.bqnames;
    const dateday5 = event.queryStringParameters.dateday5;
    const datetoday = event.queryStringParameters.datetoday;
    const response = await fetch('https://newsapi.org/v2/everything?q=' + bqnames + '&from=' + dateday5 + '&to=' + datetoday + '&sortBy=popularity&apiKey=28bda70739cc4024ba3f30223e8c25a8', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

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

module.exports = { handler }


