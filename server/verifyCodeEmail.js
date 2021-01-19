const nodemailer = require('nodemailer');
const smptCfg = require('../package').config.smtp;
const Mail = require('./models/mail');
require('dotenv').config();

async function sendMail(email, verifyCode) {

  return new Promise(async (resolve,reject)=>{
    const data = await Mail.findOne();
  
    const account = data.account;
    const password = data.password;
    let success = "";
  
    var     mailOptions = {
            from: '門禁系統(請勿自動回復)<your@gmail.com>',
            to: email,
            bcc: '',
            subject: '門禁系統驗證碼',
            text: '驗證碼為' + verifyCode  + '\n若重複寄信請以最新版本為主'
            // text: 'That was easy!',
            // html: mailBody // 下方讀檔後覆蓋
          };
      // 設定於package.json
      var transporter = nodemailer.createTransport({
        host: smptCfg.host,
        port: smptCfg.port,
        secure: smptCfg.secure, // true for 465, false for other ports
        auth: {
          user: account,
          pass: password
        },
        tls: {
          rejectUnauthorized: false
        }
      }); 

 transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log("error is "+error);
       resolve(false); // or use rejcet(false) but then you will have to handle errors
    } 
   else {
       console.log('Email sent: ' + info.response);
       resolve(true);
    }
   })
  })
 

      
}

export {sendMail};



