var mongoose = require('mongoose');

var userSchema = mongoose.Schema( {
    username: String,
    password: String,
    isAdmin: Boolean,
    comments: [{body: String, date: Date}],
    date: {
        type: Date, 
        default: Date.now
    } 
});

var User = mongoose.model('user', userSchema);
module.exports = User;