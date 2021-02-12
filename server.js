'use strict';

const Hapi = require('@hapi/hapi');


let Plugins = require('./Plugins');
let mongoose = require('mongoose');
let Routes = require('./Routes');

(async () => {
    try {
        const server = Hapi.Server({
            app: {
                name: "Word Counter"
            },
            port: 8000,
            routes: {cors: true}
        });

        await mongoose.connect("mongodb://mongo:27017/wordCounter", {useFindAndModify:false,useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true});
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

        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: './Views'
        });

        server.route(Routes);

        await server.start();

        console.log('Server running at', server.info.uri);
    }
    catch (err) {
        console.log("====================", err);
        process.exit(1);
    }
})();




