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
            res.status(500).send({message: '重新產生失敗', error: err});
            return handleError(err);
        }
        // saved!
        else {
            res.status(200).send({message: '重新產生成功', error: err});
            sendMail(email, verifyCode);
        }
        
    });

}


exports.CheckVerifyCode = async (req, res) => {

    const email = req.body.email;
    const verifyCode = req.body.verifyCode;
 

    const isVerify = Verify.findOne({email: email, verifyCode: verifyCode});

    console.log(isVerify);
    isVerify.exec(function (err, verifyResult) {
        if (err) {
            console.log('err');
            res.status(500).send({message: '尚未驗證', success: '驗證失敗'});

        }
        if(verifyResult){
            console.log(verifyResult.length);
            res.status(200).send({message: '已驗證',success: '驗證成功'});
        }
        else{
            console.log(verifyResult);
            console.log('failed');
            res.status(200).send({message: '已驗證', success: '驗證失敗'});
        
      }});

    
}

