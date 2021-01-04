const Online = require('../models/online');
//const uuid = require('uuid');

const handleError = function(err) {
    console.error(err);
    // handle your error
};

exports.getOnlinePeople = async (req, res) => {
    
    const onlinePeople = await Online.find({});
    console.log(onlinePeople.length);
    console.log(onlinePeople);
    res.status(200).send({message: 'success', onlineResult: onlinePeople})
}


