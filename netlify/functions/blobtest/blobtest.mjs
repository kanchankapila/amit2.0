import { getStore } from '@netlify/blobs';

export const handler = async (event) => {
  const store = getStore("example-store");

  try {
    const { key, value } = event.queryStringParameters;

    if (!key || !value) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing 'key' or 'value' in query parameters." }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // Store the key-value pair
    await store.set(key, value, { type: 'text' });

    // Retrieve it back
    const storedValue = await store.get(key, { type: 'text' });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Key-value stored and retrieved successfully.',
        data: { key, storedValue }
      }),
      headers: { "Content-Type": "application/json" }
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" }
    };
  }
};
