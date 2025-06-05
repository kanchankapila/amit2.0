export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
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