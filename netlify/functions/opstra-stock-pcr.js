exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'opstra stock pcr placeholder', params: event.queryStringParameters })
  };
};
