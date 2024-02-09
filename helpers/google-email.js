const nodemailer = require("nodemailer");
const { OAUTH2CLIENT } = require("../google/google.apis.conf");

async function SEND_MAIL(to, subject, text, html) {
  const ACCESS_TOKEN = await OAUTH2CLIENT.getAccessToken();

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      type: "OAuth2",
      user: process.env.MAIL,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.MAIL,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  return info.messageId;
}

module.exports = {
  SEND_MAIL,
};
