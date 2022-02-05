const MailerSmtpService = require("./mailer_smtp_service");

class PostMarkSmtpService extends MailerSmtpService {
  constructor() {
    super(() => {
      // Connects to smtp service
      console.log("Connecting to postmark smt service providers...........");
      console.log("........................................");
    });
  }

  send(mail) {
    // this.smtp_con.send(mail)
    // can also be this.smtp_con.deliver(mail)
    console.log("Mailing using postmark.........");
    console.log(mail);
    console.log("........................................");
  }
}

module.exports = PostMarkSmtpService;
