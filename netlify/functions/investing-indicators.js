exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'investing indicators placeholder', params: event.queryStringParameters })
  };
};
