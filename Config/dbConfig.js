'use strict';
let mongo = {
    URI: process.env.MONGO_URI|| "mongodb://localhost/live_chat", //local
    port: 27017
};


module.exports = {
    mongo: mongo
};
