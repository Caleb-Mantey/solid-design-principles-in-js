class MailerSmtpService {
  constructor(
    smtp_connection = () => {
      //default smtp connection.....
      console.log("Connecting to default(base class) smtp service...........");
    }
  ) {
    this.smtp_con = smtp_connection();
  }

  send(mail) {
    //this.smtp_con.send(mail);
    console.log("Mailing using defaults(base class).........");
    console.log(mail);
    console.log("........................................");
  }
}

module.exports = MailerSmtpService;
