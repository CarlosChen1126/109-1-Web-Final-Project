const Email = require('../models/mail');
exports.CheckEmailIsExist = async (req, res) => {
    //const login = new Login({account: 'ACS', password: 'aloha'});
    //login.save();

    const emailResult = await Email.find({});
    if(emailResult.length){
        res.status(200).send({message: true});
    }
    else{
        res.status(200).send({message: false});
    }
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

exports.GetEmailAccount = async (req, res) => {
    const email = Email.findOne();
    email.exec(function (err, emailResult) {
        if (err) {
            res.status(500).send({message: '連結資料庫失敗', account: '',password: ''});
        }
        else if(emailResult){
            res.status(200).send({message: '連結資料庫成功', account: emailResult.account,password: emailResult.password});
        }
        else{
            res.status(200).send({message: '尚無資料', account: '',password: ''});
        }
      });
   
      
    
}

exports.UpdateEmailAccount = async (req, res) => {
    const email = Email.findOne();
    email.exec(function (err, emailResult) {
        if (err) {
            res.status(500).send({message: '連結資料庫失敗', account: '',password: ''});

        }
        else if(emailResult){
            Email.update({ $set : { account : req.body.account , password : req.body.password }},function(err){
                if (err){
                    res.status(500).send({message: '連結資料庫失敗'});
                }
                else{
                    res.status(200).send({message: 'success'});
                }
                
            });  
        }
        else{
            const email = new Email({ account : req.body.account , password : req.body.password });
    
    email.save(function (err) {
        if (err) {
            res.status(500).send({message: '連結資料庫失敗'});
            return handleError(err);
        }
        // saved!
        else {
            res.status(200).send({message: 'success'});
        }
        
    });
        }
      });


    
    
}