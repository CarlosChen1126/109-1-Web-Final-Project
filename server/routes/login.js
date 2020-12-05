const Login = require('../models/login');

exports.Login = async (req, res) => {
    //const login = new Login({account: 'ACS', password: 'aloha'});
    //login.save();
    const account = req.body.account;
    const password = req.body.password;
    const [loginResult] = await Login.find({account: account, password: password});
    console.log('in login')
    if(loginResult){
        res.status(200).send({message: 'successful'});
    }
    else{
        res.status(200).send({message: 'failed'});
    }
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}