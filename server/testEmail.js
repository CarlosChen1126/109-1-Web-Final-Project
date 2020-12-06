//console.log('hi')
const nodemailer = require('nodemailer');
const fs = require('fs');
const smptCfg = require('../package').config.smtp;

var mailBodyPath = './system_mail.html';
var     mailOptions = {
        from: '張原嘉<your@gmail.com>',
        to: ['ycchang0324@gmail.com', 'carlos79103@gmail.com', 'bennynssn78@gmail.com'] ,
        bcc: 'testto@gmail.com',
        subject: 'github網址[點我]'
        // text: 'That was easy!',
        // html: mailBody // 下方讀檔後覆蓋
      };
  // 設定於package.json
  var transporter = nodemailer.createTransport({
    host: smptCfg.host,
    port: smptCfg.port,
    secure: smptCfg.secure, // true for 465, false for other ports
    auth: {
      user: smptCfg.auth.user,
      pass: smptCfg.auth.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  // 讀檔
  fs.readFile('./system_email.html', 'utf8', function (err, mailBody) {
    if (err) {
      return console.log(err);
    }
    // 代入mail本文
    console.log(mailBody);
    mailOptions.html = mailBody;
    
    // 寄信
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});