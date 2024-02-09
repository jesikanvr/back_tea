const nodemailer = require("nodemailer");
const { OAUTH2CLIENT } = require("../google/google.apis.conf");

async function SEND_MAIL(to, subject, text, html) {
  const ACCESS_TOKEN = await OAUTH2CLIENT.getAccessToken();

  /* console.log("ACCESS TOKEN:\n", ACCESS_TOKEN.token);
  const gmail = google.gmail({ version: 'v1', ACCESS_TOKEN });
  const result = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: {
        from: 'jesikanvr@gmail.com',//process.env.MAIL,
        to: to,
        subject: subject,
        text: text,
        html: html,
      },
    },
  });
  console.log('Message sent. ID: ', result.data.id); */

  let transporter = nodemailer.createTransport({
    service: "gamil",

    auth: {
      type: "OAuth2",
      user: process.env.MAIL,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
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
