const fetch = require("node-fetch");

const handler = async function () {
  try {
    const response = await fetch('https://etmarketsapis.indiatimes.com/ET_Stats/sectorperformance?pagesize=25&pageno=1&exchange=NSE&sortby=marketcappercentchange&sortorder=desc', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({data}),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }