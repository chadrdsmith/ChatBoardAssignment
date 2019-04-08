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
    canPost: { type: Boolean, default: true}
});

var Admin = mongoose.model('admin', adminSchema);
var User = mongoose.model('User', userSchema);

module.exports = Admin;
module.exports = User;
