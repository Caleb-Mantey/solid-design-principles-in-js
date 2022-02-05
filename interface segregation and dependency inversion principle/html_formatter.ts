// const FormatterInterface = require("./formatter_interface");
import { IFormatter } from "./interfaces/formatter_interface";
import { IStyles } from "./interfaces/styles_interface";

class HtmlFormatter implements IFormatter, IStyles {
  format(mail: string) {
    // sends html version of mail
    mail = `<html>
    <head><title>Email For You</title>${this.custom_css()}</head>
    <body>${mail}</body>
    </html>`;

    return mail;
  }

  custom_css(): string {
    return "<style>body{background-color: blue}</style>";
  }
}

export default HtmlFormatter;
