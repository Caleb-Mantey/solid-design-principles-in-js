export default class MailerSmtpService {

  smtp_con: any;

  constructor(
    smtp_connection = () => {
      //default smtp connection.....
      console.log("Connecting to default smtp service...........");
    }
  ) {
    this.smtp_con = smtp_connection();
  }

  send(mail: string) {
    //this.smtp_con.send(mail);
    console.log("Sending default sms................")
    console.log(mail)
    console.log("............................")
  }
}