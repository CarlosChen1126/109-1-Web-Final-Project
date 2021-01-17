const Access = require('../models/online');

exports.getAccess = async (req, res) => {
    const idd=req.query.number
    const data =await Access.find({stdID:idd})
    var dtime=[]
    for(let i=0;i<data.length;i++){
        dtime[i]=data[i].time
    }
    
    res.status(200).send({message:'success', time:dtime.toString()})
}


