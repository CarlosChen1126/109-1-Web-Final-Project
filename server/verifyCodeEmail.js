const nodemailer = require('nodemailer');
const fs = require('fs');
const smptCfg = require('../package').config.smtp;
require('dotenv').config();

function sendMail(email, verifyCode) {
  var     mailOptions = {
          from: '門禁系統(請勿自動回復)<your@gmail.com>',
          to: email,
          bcc: '',
          subject: '門禁系統驗證碼',
          text: '驗證碼為' + verifyCode
          // text: 'That was easy!',
          // html: mailBody // 下方讀檔後覆蓋
        };
    // 設定於package.json
    var transporter = nodemailer.createTransport({
      host: smptCfg.host,
      port: smptCfg.port,
      secure: smptCfg.secure, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });    
      // 寄信
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export {sendMail};



