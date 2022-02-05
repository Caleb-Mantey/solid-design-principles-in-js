class MailerSmtpService {
  constructor(
    smtp_connection = () => {
      //default smtp connection.....
      console.log("Connecting to default smtp service...........");
    }
  ) {
    this.smtp_con = smtp_connection();
  }

  send(mail) {
    this.smtp_con.send(mail);
  }
}

module.exports = MailerSmtpService;
