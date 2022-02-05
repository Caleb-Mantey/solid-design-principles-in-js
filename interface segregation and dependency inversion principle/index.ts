import Mailer from "./mailer";
import HtmlFormatter from "./html_formatter";
import TextFormatter from "./text_formatter";

const mailer = new Mailer("hello kwame", [
  new HtmlFormatter(),
  new TextFormatter(),
]);
mailer.send();
