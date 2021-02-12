let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');

let wordDb = new mongoose.Schema({
    name: {type: String, required: true,index:true},
    wordCount:{type:Number},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    isDeleted: {type: Boolean, default: false, required: true},
});

module.exports = mongoose.model('wordDb', wordDb);