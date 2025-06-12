exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'nt stock details placeholder', params: event.queryStringParameters })
  };
};
