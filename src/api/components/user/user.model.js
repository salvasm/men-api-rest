var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:       { type: String },
    lastname:   { type: String },
    gender:     { type: String },
    isPlayer:   { type: Boolean },
    isPartner:  { type: Boolean },
    birthday:   { type: Date }
});

module.exports = mongoose.model('User', userSchema);