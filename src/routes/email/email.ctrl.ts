import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const { MYEMAIL, EMAIL_PASSWORD } = process.env;

export const sendEmail = (req, res, next) => {
  try {
    const { username, guestEmail, title, content } = req.body;
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: MYEMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `cucook<${MYEMAIL}>`,
      to: 'seongwoo720@gmail.com',
      subject: `${title}`,
      html: `
      <div><b>보낸 분 주소 : ${guestEmail}</b></div>
      <div><b>보낸 분 성함 : ${username}</b></div>
      <br/>
      <div>${content}</div>`,
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        next(error);
      } else {
        res.json('good');
      }
      smtpTransport.close();
    });
  } catch (e) {
    next(e);
  }
};
