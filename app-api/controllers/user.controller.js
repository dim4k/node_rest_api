const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User.findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};

module.exports.findUserById = function(req, res) {
    User.findById(req.params.id)
        .exec(function(err, users) {
            if(users != null) {
                let lightUsers = [];
                if(Array.isArray(users)) {
                    let i = 0;
                    for (let user of users) {
                        lightUsers[i] = {"email" :user.email,"name":user.name};
                        i++;
                    }
                }else{
                    lightUsers[0] = {"email": users.email,"name":users.name};
                }
                res.status(200).json(lightUsers);
            }else{
                res.status(200).json({});
            }
        });

};

module.exports.findUsers = function(req, res) {
    let userModel = User.find();
    if(typeof req.query.name != 'undefined'){
        userModel.find({'name': req.query.name})
    }
    if(typeof req.query.email != 'undefined'){
        userModel.find({'email': req.query.email})
    }
    userModel.exec(function(err, users) {
            if(users != null) {
                let lightUsers = [];
                if(Array.isArray(users)) {
                    let i = 0;
                    for (let user of users) {
                        lightUsers[i] = {"email" :user.email,"name":user.name};
                        i++;
                    }
                }else{
                    lightUsers[0] = {"email": users.email,"name":users.name};
                }
                res.status(200).json(lightUsers);
            }else{
                res.status(200).json({});
            }
        });
};