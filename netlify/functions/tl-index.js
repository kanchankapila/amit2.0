exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'tl index placeholder', params: event.queryStringParameters })
  };
};
