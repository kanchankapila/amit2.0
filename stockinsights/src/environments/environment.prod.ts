export const environment = {
  production: true,
  apiUrl: 'https://api.stockinsights.com',
  authConfig: {
    tokenExpiryTime: 3600,
    refreshTokenExpiryTime: 86400,
    tokenPrefix: 'Bearer'
  },
  apiConfig: {
    timeout: 30000,
    retryAttempts: 3,
    cacheTime: 300000
  }
}; 