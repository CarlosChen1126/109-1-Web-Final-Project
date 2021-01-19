const Login = require('../models/login');

exports.CheckAccountIsExist = async (req, res) => {
    //const login = new Login({account: 'ACS', password: 'aloha'});
    //login.save();

    const loginResult = await Login.find({});
    if(loginResult.length){
        res.status(200).send({message: true});
    }
    else{
        res.status(200).send({message: false});
    }
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

exports.GetManagerAccount = async (req, res) => {
    const managerAccount = Login.findOne();
    managerAccount.exec(function (err, managerResult) {
        if (err) {
            res.status(500).send({message: '連結資料庫失敗', account: '',password: ''});
        }
        else if(managerResult){
            res.status(200).send({message: '連結資料庫成功', account: managerResult.account,password: managerResult.password});
        }
        else{
            console.log('nothing');
            res.status(200).send({message: '尚無資料', account: '',password: ''});
        }
      });
   
      
    
}

exports.UpdateManagerAccount = async (req, res) => {
    const managerAccount = Login.findOne();
    managerAccount.exec(function (err, managerResult) {
        if (err) {
            console.log('err');
            res.status(500).send({message: '連結資料庫失敗', account: '',password: ''});

        }
        else if(managerResult){
            Login.update({ $set : { account : req.body.account , password : req.body.password }},function(err){
                if (err){
                    res.status(500).send({message: '連結資料庫失敗'});
                }
                else{
                    res.status(200).send({message: 'success'});
                }
                
            });  
        }
        else{
            const managerResult = new Login({ account : req.body.account , password : req.body.password });
    
        managerResult.save(function (err) {
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

exports.AddManagerAccount = async (req, res) => {
    const account = req.body.account;
    const password = req.body.password
    const login = new Login({account: account, password: password});
    login.save().then(function(){ 
        res.status(200).send({message: '新增管理員帳密成功'});
    }).catch(function(error){ 
        res.status(200).send({message: '新增管理員帳密失敗'});
    }); 

     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

exports.Login = async (req, res) => {
    //const login = new Login({account: 'ACS', password: 'aloha'});
    //login.save();
    const account = req.body.account;
    const password = req.body.password;
    const loginResult = await Login.find({account: account, password: password});
    if(loginResult.length){
        res.status(200).send({message: 'success'});
    }
    else{
        res.status(200).send({message: 'failed'});
    }
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}