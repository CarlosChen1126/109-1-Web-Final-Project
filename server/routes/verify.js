const Verify = require('../models/verify');
import { sendMail } from '../verifyCodeEmail';

exports.GenerateCode = async (req, res) => {


    const handleError = function(err) {
        console.error(err);
        // handle your error
    };
    const email = req.body.email;
    const verifyCode = Math.round(Math.random()* 900000 + 100000);


    Verify.deleteMany({ email: email }).then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
    const verify = new Verify({email: email, verifyCode: verifyCode});
    
    verify.save(function (err) {
        if (err) {
            res.status(200).send({message: '產生驗證碼失敗', error: err});
            return handleError(err);
        }
        // saved!
        else {
            async function sendMailResult(email, verifyCode){
                const sendMailResult = await sendMail(email, verifyCode);
                if(sendMailResult === false){
                    res.status(200).send({message: '寄送驗證信失敗', error: err});
                }else if(sendMailResult === true){
                    res.status(200).send({message: '寄送驗證信成功', error: err});
                }
            }
            sendMailResult(email, verifyCode);
            
            
            
        }
        
    });

}


exports.CheckVerifyCode = async (req, res) => {

    const email = req.body.email;
    const verifyCode = req.body.verifyCode;
 

    const isVerify = Verify.findOne({email: email, verifyCode: verifyCode});

    isVerify.exec(function (err, verifyResult) {
        if (err) {
            console.log('err');
            res.status(500).send({message: '尚未驗證', success: '驗證失敗'});

        }
        else if(verifyResult){
            res.status(200).send({message: '已驗證',success: '驗證成功'});
        }
        else{
            res.status(200).send({message: '已驗證', success: '驗證失敗'});
        
      }});

    
}

