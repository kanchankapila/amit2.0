exports.handler = async function (event, context) {
  try {
    // ✅ Correct way to dynamically import with named exports
    const { get } = await import('@netlify/blobs');

    const csrf = await get('trendlyne/csrf', { type: 'text' });
    const trnd = await get('trendlyne/trnd', { type: 'text' });

    if (!csrf || !trnd) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Tokens not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tokens retrieved successfully",
        tokens: { csrf, trnd }
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
