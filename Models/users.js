let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let user = new mongoose.Schema({
    name: {type: String, required: true,index:true},
    isActive: {type:Boolean, default: false}, // If user's online or not
    isDeleted: {type: Boolean, default: false, required: true},
    groups: [{
        groupId: Schema.ObjectId
    }],
}, {timestamps: true});

module.exports = mongoose.model('user', user);