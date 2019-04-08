var mongoose = require('mongoose');

var SessionSchema = mongoose.Schema ({
    username: String,
    password: String,
    isAdmin: Boolean,
});

var Sessions = mongoose.model('sessions', SessionSchema);
module.exports = Sessions;
