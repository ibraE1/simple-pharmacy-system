import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { htmlToText } from "html-to-text";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE.toLowerCase() == "tls",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = await ejs.renderFile(`${__dirname}/../views/${template}.ejs`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    return this.newTransport().sendMail(mailOptions);
  }

  async sendConfirmation() {
    await this.send("confirm", "Order Confirmation");
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to The Pharmacy!");
  }

  async sendNotification() {
    await this.send("notification", "We Miss You!");
  }
}

export default Email;
