const { getStore } = require("@netlify/blobs");

exports.handler = async function (event, context) {
  try {
    const store = getStore("trendlyne");

    const csrf = await store.get("csrf", { type: "text" });
    const trnd = await store.get("trnd", { type: "text" });

    if (!csrf || !trnd) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Tokens not found" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tokens retrieved successfully",
        tokens: { csrf, trnd },
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" },
    };
  }
};
