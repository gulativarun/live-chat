const { userJoin, getCurrentUser, userLeave, getGroupUsers } = require('../Utils/users')


exports.connectSocket = function (socket) {

    let io = require('socket.io')(socket.listener);
    io.on('connection', async(socket) => {
        try{

            console.log("socket connected");
            await socket.emit('socketConnected', {
                statusCode: 200,
                message: 'connected',
                data: {socketId: socket.id}
            });


            await socket.on('joinRoom', (userName, group) => {
                const user = userJoin(socket.id, userName, group);
                socket.join(user.group); // join  a group

                // welcome user to the group

                socket.emit('message', 'Welcome to the Group!');

                // broadcast when a user connect

                socket.broadcast
                    .to(user.group)
                    .emit('message', `${user.userName} is joined the group.`);

                io.to(user.group).emit('groupUsers', {
                   group: user.group,
                    users: getGroupUsers(user.group)
                });

            });




            await socket.on("chatMessage",  async  (obj) =>{
                await io.to(obj.socketId).emit("chatMessage", obj); // individual message
            });

            socket.on('disconnect', async function (reason) {
                // console.log(reason);
                const user = userLeave(socket.id);

                if (user) {
                    io.to(user.group).emit('message', `${user.userName} has left the group.`);


                    io.to(user.group).emit('groupUsers', {
                        group: user.group,
                        users: getGroupUsers(user.group)
                    });

                }
            });
        }
        catch(err){
            console.log(err,'=======Error=============',err);
            await socket.emit('socketError',err);
            return {};
        }
    });
};

