const nodemailer = require("nodemailer");
const { TRANSPORTER } = require("../smtp/smtp");

async function SEND_MAIL(to, subject, text, html) {

  let info = await TRANSPORTER.sendMail({
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