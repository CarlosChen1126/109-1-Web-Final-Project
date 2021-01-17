const Online = require('../models/online');

exports.getOnlinePeople = async (req, res) => {
    
    const onlinePeople = await Online.find({});
    res.status(200).send({message: 'success', onlineResult: onlinePeople})
}


