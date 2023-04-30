import nodemailer from 'nodemailer';
import config from './config';

const transpoter = nodemailer.createTransport({
  service: config.MAILER_SERVICE,
  auth:{
    user: config.MAILER_USER,
    pass: config.MAILER_PASS
  }
});

const send = (to: string, subject: string, text: string) => {
  transpoter.sendMail({
    from: config.MAILER_USER,
    to, subject, text
  }, (e) => console.log(e));
};

exports.default = {
  send
};
