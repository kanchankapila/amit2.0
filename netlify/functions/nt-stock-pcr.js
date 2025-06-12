exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'nt stock pcr placeholder', params: event.queryStringParameters })
  };
};
