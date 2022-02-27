const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
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
    const {name, username} = JSON.parse(content);
    const contentObject = JSON.parse(content);
    delete contentObject.username;
    const newContent = JSON.stringify({
      playlist: contentObject,
    });
    const message = {
      from: 'Open Music API',
      to: targetEmail,
      subject: `Export Playlist ${name} by ${username}`,
      text: 'Attached is the result of the playlist export',
      attachments: [
        {
          filename: 'playlist.json',
          content: newContent,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
