const { google } = require("googleapis");

const AUTH = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const OAUTH2CLIENT = new google.auth.OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  process.env.MAIL_REDIRECT_URI
);

OAUTH2CLIENT.setCredentials({ refresh_token:  process.env.MAIL_REFRESH_TOKEN });

module.exports = {
  AUTH,
  OAUTH2CLIENT
};
