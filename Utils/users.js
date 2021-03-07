let Models = require('../Models');
let UniversalFunctions = require('../Utils/UniversalFunctions');
let Service = require('../Services');



// join user to group
async function userJoin(socketId, userName, group) {
    const user = {socketId, userName, group};
    return await Service.DataServices.createData(Models.user, user);
}


// Get current user
async function getCurrentUser(id) {
    return await Service.DataServices.getData(Models.user, {socketId: id}, {}, {lean: true});
}

// User leaves the Group
async function userLeave (id) {
    return await Service.DataServices.deleteData(Models.user, {socketId: id}, {}, {new: false, remove: true,})
}

// Get all the users in the group
async function getGroupUsers (group) {
    return await Service.DataServices.getData(Models.user, {group: {$in: group}}, {}, {lean: true});
}

async function saveGroupChat (obj) {

}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getGroupUsers,
    saveGroupChat
};