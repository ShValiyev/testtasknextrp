var db = require('../lib/mongoose');

var Schema = db.Schema;

var schema = new Schema({
    fullName: { 
        type: String, 
        required: true,
        maxlength: 100
    },
    birthday: { 
        type: String, 
        required: true
    },
    address: { 
        type: String, 
        required: false
    },
    city: {
        type: String,
        required: false
    },    
    phoneNumber: {
        type: String,
        required: false
    }
});

schema.statics.addUser = function(body, callback){
    var User = this;
    user = new User;
    user.fullName = body.fullName;
    user.birthday = body.birthday;
    user.address = body.address;
    user.city = body.city;
    user.phoneNumber = body.phoneNumber;
    user.save(callback);
};

schema.statics.findUsers = function(callback){
    var User = this;
    User.find({}, callback)
};

schema.statics.updateUser = function(userId, body, callback){
    var User = this;
    User.updateOne({_id: userId}, {
        fullName: body.fullName,
        birthday: body.birthday,
        address: body.address,
        city: body.city,
        phoneNumber: body.phoneNumber
    }, callback);
};

schema.statics.deleteUser = function(userId, callback){
    var User = this;
    User.deleteOne({_id: userId}, callback);
};

module.exports = db.model('User', schema);