import { IFormatter } from './interfaces/formatter_interface'

class TextFormatter implements IFormatter {

  format(mail: string) {
    // sends text version of mail
    mail = "Text Version \n" + mail;

    return mail;
  }
}

module.exports = TextFormatter;
