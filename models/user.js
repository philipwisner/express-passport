var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        index: {
            unique: true
        }
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
    facebookID: String,
    googleID: String
});

var User = mongoose.model('User', UserSchema);



module.exports = User;