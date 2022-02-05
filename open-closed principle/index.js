const Mailer = require("./mailer");
const HtmlFormatter = require("./html_formatter");
const TextFormatter = require("./text_formatter");

const mailer = new Mailer("hello kwame", [
  new HtmlFormatter(),
  new TextFormatter(),
]);
mailer.send();
