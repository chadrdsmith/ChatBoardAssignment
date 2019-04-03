var mongoose = require('mongoose');

var adminSchema = mongoose.Schema ({
    username: String,
    password: String,
    isAdmin: Boolean,
});

var userSchema = mongoose.Schema( {
    username: String,
    password: String,
    isAdmin: Boolean,
});

var Admin = mongoose.model('admin', adminSchema, 'users');
var User = mongoose.model('user', userSchema, 'users');

module.exports = Admin;
module.exports = User;
