export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  appName: import.meta.env.VITE_APP_NAME || 'Boi Para',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
  enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;