const Access = require('../models/access');

exports.getAccess = async (req, res) => {
    console.log('getAccess')
    const data = await Access.find({stdID:req.query.number})
    res.status(200).send({message: 'success', time: data})
}


