exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'opstra stock pcr intra placeholder', params: event.queryStringParameters })
  };
};
