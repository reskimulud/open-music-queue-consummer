const nodemailer = require('nodemailer');

class MailSender {
  #transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    console.log('content :', content)
    const parseName = JSON.parse(content);
    const name = parseName.playlist.name;
    console.log('name :', name)
    const message = {
      from: 'Open Music API',
      to: targetEmail,
      subject: `Export Playlist ${name}`,
      text: 'Attached is the result of the playlist export',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this.#transporter.sendMail(message);
  }
}

module.exports = MailSender;
