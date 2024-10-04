const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async () => {
  try {
    const response = await fetch('https://vercel-ruddy-nine.vercel.app/api/trendlynecookie', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        "Content-Type": "application/json" // Explicitly setting content type
      },
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        "Content-Type": "application/json" // Explicitly setting content type
      },
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
