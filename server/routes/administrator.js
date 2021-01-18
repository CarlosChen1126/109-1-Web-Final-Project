const Administrator = require('../models/administrator');

exports.GetAdministrator = async (req, res) => {
    const data = await Administrator.find();
    res.status(200).send({message: 'success', adminResult: data})
}

exports.InsertAdministrator = async (req, res) => {
    const day = req.body.day;
    const time = req.body.time;
    const name = req.body.name;
    const administrator = new Administrator({day: day, time: time, name: name});

    administrator.save(function (err) {
        if (err) {
            res.status(200).send({message: '新增失敗', error: err});
        }
        // saved!
        else {
            res.status(200).send({message: '新增成功', error: err});
        }
        
    });
}

exports.DeleteAdministrator = async (req, res) => {
    await Administrator.deleteOne({day: req.body.day, time: req.body.time, name: req.body.name}, function (err) {
        if (err){
            res.status(200).send({message: '刪除失敗'});
        }else{
            res.status(200).send({message: '刪除成功'});
        }
        
        // deleted at most one tank document
      });
    
     
    // TODO : get answers from mongodb,
    // check answers coming from frontend and return score to frontend
}

