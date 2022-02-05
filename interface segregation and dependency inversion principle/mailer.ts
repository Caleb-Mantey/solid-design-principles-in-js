import MailerSmtpService from "./mailer_smtp_service";
import { IFormatter } from './interfaces/formatter_interface';
import PostMarkSmtpService from './postmark_smtp_service';
import SendGridSmtpService from './sendgrid_smtp_service';


class Mailer {
  _mail: string;
  _mailerFormats: Array<IFormatter>;
  _smtpService: MailerSmtpService;

  constructor(mail: string, mailerFormats: Array<IFormatter>) {
    this._mail = mail;
    this._mailerFormats = mailerFormats;
    // this._smtpService = new SendGridSmtpService();
    // this._smtpService = new PostMarkSmtpService();
    this._smtpService = new MailerSmtpService();
  }

  send() {
    // Loops through mail formats and calls the send method
    this._mailerFormats.forEach((formater) =>
      this._smtpService.send(formater.format(this._mail))
    );
  }
}

module.exports = Mailer;
