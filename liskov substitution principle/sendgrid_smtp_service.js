const MailerSmtpService = require("./mailer_smtp_service");

class SendGridSmtpService extends MailerSmtpService {
  constructor() {
    super(() => {
      // Connects to smtp service
      console.log("Connecting to sendgrid smt service providers............");
      console.log("........................................");
    });
  }

  send(mail) {
    // this.smtp_con.send(mail)
    // can also be this.smtp_con.deliver(mail)
    console.log("Mailing using sendgrid.........");
    console.log(mail);
    console.log("........................................");
  }
}

module.exports = SendGridSmtpService;
