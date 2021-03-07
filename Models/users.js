// let mongoose = require('mongoose');
// let Schema = mongoose.Schema;
// let Config = require('../Config');
//
// let users = new mongoose.Schema({
//     name: {type: String, required: true,index:true},
//     isActive: {type:Boolean, default: false}, // If user's online or not
//     isDeleted: {type: Boolean, default: false, required: true},
//     groups: [{
//         groupId: Schema.ObjectId
//     }],
// }, {timestamps: true});




const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Config = require('../Config');


const users = new mongoose.Schema({
    userName: {
        type: String,
    },
    isActive: {
        type:Boolean,
        default: false
    }, // If user's online or not
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlocked : {
        type: Boolean,
        default : false
    },
    socketId: {
        type: String,
    },
    inGroup: {
        type: String,
    },
    group: [
        {
            type: String
        },

    ]
},{timestamps: true});



module.exports = mongoose.model('users', users);