class MailerSmtpService {
  constructor() {
    this.smtp_con = this.smtp_service_connection();
  }

  send(mail) {
    // this.smtp_con.send(mail);
    // can also be this.smtp_con.deliver(mail)
    console.log(mail);
  }

  smtp_service_connection() {
    // Connects to smtp service
    console.log("Connecting to smtp service");
  }
}

module.exports = MailerSmtpService;
