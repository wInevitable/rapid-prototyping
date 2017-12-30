const Configuration = {
  API_KEY: process.env.API_KEY || null,
  FACEBOOK_SCOPES: [ process.env.FACEBOOK_SCOPES || null ],
  HEAP_API_KEY: process.env.HEAP_API_KEY || null,
  NODE_ENV: process.env.NODE_ENV || null,
  PROJECT_ID: process.env.PROJECT_ID || null,
  PROJECT_ID_FOR_BUCKET: process.env.PROJECT_ID_FOR_BUCKET || null,
  SENTRY_API_KEY: process.env.SENTRY_API_KEY || null,
}

export default Configuration
