import MailerSmtpService from "./mailer_smtp_service";
import { IFormatter } from "./interfaces/formatter_interface";
import PostMarkSmtpService from "./postmark_smtp_service";
import SendGridSmtpService from "./sendgrid_smtp_service";

class Mailer {
  mail: string;
  mailerFormats: Array<IFormatter>;
  smtpService: MailerSmtpService;

  constructor(mail: string, mailerFormats: Array<IFormatter>) {
    this.mail = mail;
    this.mailerFormats = mailerFormats;
    // this.smtpService = new SendGridSmtpService();
    // this.smtpService = new PostMarkSmtpService();
    this.smtpService = new MailerSmtpService();
  }

  send() {
    // Loops through mail formats and calls the send method
    this.mailerFormats.forEach((formater) =>
      this.smtpService.send(formater.format(this.mail))
    );
  }
}

export default Mailer;
