const nodemailer = require('nodemailer');
const config = require('../config/config.json');


module.exports.sendEmail = function (req, res) {
  if (!req.body.name || !req.body.name || !req.body.message) {
    // добавить обработку ошибок
    return;
  }

  try {
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
      from: `"${req.body.name} <${req.body.email}>"`,
      to: config.mail.smtp.auth.user,
      subject: config.mail.subject,
      text: req
        .body
        .message
        .trim()
        .slice(0, 1000) + `\n Отправлено с: <${req.body.email}>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      // добавить обработку ошибок
      if (error) {
        console.log(error.message);
      }

      res.redirect('/portfolio')
      return;
    })
  } catch (error) {
    console.log(error);
  }
}