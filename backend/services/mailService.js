/* eslint-disable */
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: String(process.env.SMTP_USER),
        pass: String(process.env.SMTP_PASSWORD),
      },
    })

    this.transporter.verify((err, success) => {
      if (err) console.error(err)
      console.log('Your config is correct')
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation for ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>To activate your account follow the link</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    })
  }
}

export default new MailService()
