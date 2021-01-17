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
            res.status(404).send({message: 'failed', error: err});
            return handleError(err);
        }
        // saved!
        else {
            res.status(200).send({message: 'success', error: err});
        }
        
    });
}

