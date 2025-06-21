const { createBlobClient } = await import('@netlify/blobs');

export const handler = async () => {
  const blobs = createBlobClient();
  await blobs.set('trendlyne/csrf', 'your_csrf_token_here');
  await blobs.set('trendlyne/trnd', 'your_trnd_cookie_here');

  return {
    statusCode: 200,
    body: 'Tokens saved',
  };
};
