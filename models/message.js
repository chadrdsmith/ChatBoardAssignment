var mongoose = require('mongoose');

var messageSchema = mongoose.Schema( {
    name: String,
    comments: [{body: String, date: Date}],
    date: {
        type: Date, 
        default: Date.now
    } 
});

var Comment = mongoose.model('Comment', messageSchema);
module.exports = Comment;