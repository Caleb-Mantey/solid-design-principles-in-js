class TextFormatter {
  constructor() {}

  format(mail) {
    // sends text version of mail
    mail = "Text Version \n" + mail;

    return mail;
  }
}

module.exports = TextFormatter;
