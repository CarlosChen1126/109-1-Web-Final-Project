const Access = require('../models/access');
//const uuid = require('uuid');

const handleError = function(err) {
    console.error(err);
    // handle your error
};

exports.getAccess = async (req, res) => {
    console.log('this is getAccess')
    const idd=req.query.number
    console.log('idd',idd)
    const data =await Access.find({stdID:idd})
    console.log(data[0].time)
    var dtime=[]
    for(let i=0;i<data.length;i++){
        dtime[i]=data[i].time
    }
    
    console.log(typeof(dtime))
    console.log(dtime.toString())
    // if(data.length!==0){
        res.status(200).send({message:'success',time:dtime.toString()})
    // }
    // else{
    //     res.status(403).send({message:'error', data:[]})
    // }
   
}


