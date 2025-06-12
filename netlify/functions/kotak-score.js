exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'kotak score placeholder', params: event.queryStringParameters })
  };
};
