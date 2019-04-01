var mongoose = require ('mongoose');
var moment = require ('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
    name: 'String',
    message: 'String',
    date: {
        type: Date, 
        default: Date.now
    } 
});

module.exports = mongoose.model('Message', MessageSchema);
