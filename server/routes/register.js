const Register = require('../models/register');
//const uuid = require('uuid');

const handleError = function(err) {
    console.error(err);
    // handle your error
};

exports.RegisterCheck = async (req, res) => {
    const stdID = req.body.stdID;
    const name = req.body.name;
    const email = req.body.email;
    
    const stdIDCheck = await Register.find({stdID: stdID});
    const emailCheck = await Register.find({email: email});
    console.log(stdIDCheck);
    console.log(emailCheck);
    if(stdIDCheck === []){
        res.status(200).send({message: '學號已註冊'});
    }
    else if(emailCheck === []){
        res.staus(200).send({message: '信箱已被註冊'})
    }else{
        res.status(200).send({message: 'success'});
    }
    /*
    const register = new Register({stdID: stdID, name: name, email: email});
    
    register.save(function (err) {
        if (err) {
            res.status(200).send({message: 'failed', error: err});
            return handleError(err);
        }
        // saved!
        else {
            res.status(200).send({message: 'success', error: err});
        }
        
    });
*/
    
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

exports.CheckUsers = async (req, res) => {

    const registerResult = await Register.find();
    res.status(200).send({message: 'success', registerResult: registerResult});

    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

exports.DeleteUsers = async (req, res) => {
    await Register.remove({_id : req.body.source});
    res.status(200).send({message: 'success', registerResult: "delete successfully"});
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

exports.UpdateUserData = async (req, res) => {
    console.log(req.body.stdID)
    await Register.update({_id : req.body.id},{ $set : { stdID : req.body.stdID , name : req.body.name }});
    res.status(200).send({message: 'success', registerResult: "update successfully"});
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}


exports.RegisterInDatabase = async (req, res) => {
    const stdID = req.body.stdID;
    const name = req.body.name;
    const email = req.body.email;
    
    const register = new Register({stdID: stdID, name: name, email: email});
    
    register.save(function (err) {
        if (err) {
            res.status(200).send({message: '註冊失敗', error: err});
            return handleError(err);
        }
        // saved!
        else {
            res.status(200).send({message: '註冊成功', error: err});
        }
        
    });

}