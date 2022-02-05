class HtmlFormatter {
  constructor() {}

  format(mail) {
    // sends html version of mail
    mail = `<html>
    <head><title>Email For You</title></head>
    <body>${mail}</body>
    </html>`;

    return mail;
  }
}

module.exports = HtmlFormatter;
