var mongoose = require('mongoose');

var userSchema = mongoose.Schema( {
    username: String,
    password: String,
    isAdmin: Boolean,
    canPost: { type: Boolean, default: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
