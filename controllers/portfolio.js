const nodemailer = require('nodemailer');
const logger = require('../logger');
const config = require('../config/config.json');


module.exports.sendEmail = function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({ message: "Все поля обязательны для заполнения" });
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
      if (error) {
        return res.status(400).json({ message: `$При отправке письма произошла ошибка: ${error.message}` });
      }

      res.status(200).json({ message: "Сообщение отправлено" });
      return;
    })
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: `$Произошла ошибка: ${error.message}` });
  }
}