exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'mm valuation placeholder', params: event.queryStringParameters })
  };
};
