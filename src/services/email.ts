import nodemailer, { TransportOptions, SentMessageInfo } from "nodemailer";

export interface SendEmailConfig {
  to: string;
  subject: string;
  text: string;
  data: {
    message: string;
  };
}

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
} as TransportOptions);

export async function sendEmail({
  to,
  subject,
  text,
  data,
}: SendEmailConfig): Promise<SendEmailConfig | unknown> {
  return transporter.sendMail({
    from: process.env.SMTP_HOST, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: `<b>Hello world?: ${data.message}</b>`, // html body
  });
}
