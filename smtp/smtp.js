const nodemailer = require("nodemailer");

const TRANSPORTER = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    //secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });


  module.exports = {
    TRANSPORTER,
};

  
/*   let mailOptions = {
    from: "jesy.teams@outlook.es",
    to: "jesikanvr@gmail.com",
    subject: "Asunto del correo Hola",
    text: "Contenido del correo, SIIIIIIIII",
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  }); */
  