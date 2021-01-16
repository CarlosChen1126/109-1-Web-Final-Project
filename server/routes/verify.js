const Verify = require('../models/verify');
import { sendMail } from '../testEmail';

exports.GenerateCode = async (req, res) => {


    const handleError = function(err) {
        console.error(err);
        // handle your error
    };
    const email = req.body.email;
    const verifyCode = Math.round(Math.random()* 900000 + 100000);
    console.log(email);
    console.log(verifyCode);

    Verify.deleteMany({ email: email }).then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
    const verify = new Verify({email: email, verifyCode: verifyCode});
    
    verify.save(function (err) {
        if (err) {
            res.status(200).send({message: 'failed', error: err});
            return handleError(err);
        }
        // saved!
        else {
            res.status(200).send({message: 'success', error: err});
            sendMail(email, verifyCode);
        }
        
    });

}


exports.CheckVerifyCode = async (req, res) => {

    const handleError = function(err) {
        console.error(err);
        // handle your error
    };
    const email = req.body.email;
    const verifyCode = req.body.verifyCode;
    console.log('email: ' + email);
    console.log('verify code: ' + verifyCode);
    const isVerify = await Verify.find({email: email, verifyCode: verifyCode});
    console.log('is verify: ' + isVerify);
    if(isVerify.length){
        res.status(200).send({message: '驗證成功'});
    }
    else{
        res.status(200).send({message: '驗證失敗'});
    }
}

