'use strict';

const Hapi = require('@hapi/hapi');


let Plugins = require('./Plugins');
let mongoose = require('mongoose');
let Routes = require('./Routes');
let Config = require('./Config');
let SocketManager = require('./Lib/SocketManager');

(async () => {
    try {
        const server = Hapi.Server({
            app: {
                name: "Live Chat"
            },
            port: 8000,
            routes: {cors: true}
        });

        await mongoose.connect(Config.DB_CONFIG.mongo.URI, {useFindAndModify:false,useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true});
        console.log('MongoDB Connected');

        server.route(
            [
                {
                    method: 'GET',
                    path: '/',
                    handler:  (req, h) =>{
                        //TODO Change for production server
                        return h.view('index')

                    }
                },
            ]
        );

        await server.register(Plugins);
        await SocketManager.connectSocket(server);
        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: './Views'
        });

        server.route(Routes);

        await server.start();

        console.log('Server running at', server.info.uri || 8000);
    }
    catch (err) {
        console.log("====================", err);
        process.exit(1);
    }
})();




