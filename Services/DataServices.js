'use strict';

let Models = require('../Models');
let mongoose = require('mongoose');


//Get user_tokens from DB
let getData = function (Model,criteria, projection, options, callback) {
     // console.log('---dddd-----',Model,criteria,projection)
    return Model.find(criteria, projection, options, callback);


};

//Insert user_tokens in DB
let createData = function (Model,objToSave, callback) {
    return new Model(objToSave).save(callback)
};


// Delete data in DB
let deleteData = function (Model, criteria, projection, options, callback) {
    return Model.findAndModify(criteria, projection, options, callback)
}

// Delete many in DB

let deleteMultipleData =  function (Model, objToDelete, callback) {
    return Model.deleteMany(objToDelete, callback);
};

let updateMultipleData = function (Model,criteria, dataToSet, options, callback) {
    return Model.updateMany(criteria, dataToSet, options, callback);
};


module.exports = {
    createData: createData,
    deleteData: deleteData,
    getData: getData,
    updateMultipleData:updateMultipleData,
};




