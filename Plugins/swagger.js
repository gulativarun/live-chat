'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const HapiSwagger = require('hapi-swagger');
//Register Swagger
let Pack = require('../package');


module.exports.swaggerPlugin = {
    name: 'swagger-plugin',
    register: async  (server, options)=> {
        try {
            const swaggerOptions = {
                info: {
                    'title': "Dalqan API's",
                    // description: 'API documentation for food ordering website',
                    'version': Pack.version,
                },
                documentationPage: process.env.NODE_ENV !== 'Production'
            };
            await server.register([
                Inert,
                Vision,
                // Blipp,
                {
                    'plugin': HapiSwagger,
                    'options': swaggerOptions
                }

            ]);
            console.log('info', 'Swagger Plugins Loaded')
        }
        catch (err) {
            console.error('Error while loading plugins : ' + err)
        }
    }
};
/*
exports.register.attributes = {
    name: 'swagger-plugin'
};*/
