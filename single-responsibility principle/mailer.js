const MailerSmtpService = require("./mailer_smtp_service");

class Mailer {
  constructor(mail, mailerFormats) {
    this.mail = mail;
    this.mailerFormats = mailerFormats;
    this.smtpService = new MailerSmtpService();
  }

  send() {
    // Loops through mail formats and calls the send method
    this.mailerFormats.forEach((formater) =>
      this.smtpService.send(formater.format(this.mail))
    );
  }
}

module.exports = Mailer;
