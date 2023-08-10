require("dotenv").config();

module.exports = {
  env: { node: process.env.NODE_ENV },
  server: { url: process.env.SERVER },
  port: process.env.PORT,
  app: {
    name: process.env.APP_NAME,
    url: process.env.APP_BASE_URL,
  },
  database: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiredIn: process.env.JWT_EXPIRED_IN,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    senderEmail: process.env.SENDGRID_SENDER_EMAIL,
    senderName: process.env.SENDGRID_SENDER_NAME,
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webHookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
};
