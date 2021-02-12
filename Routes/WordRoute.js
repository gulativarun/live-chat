const Joi = require('joi');
let Models = require('../Models');
let UniversalFunctions = require('../Utils/UniversalFunctions');
let Config = require('../Config');
let Service = require('../Services');

module.exports = [
    {
        method: 'PUT',
        path: '/words',
        handler: async  (request, h) =>{
            let payloadData = request.query;
            try {
                let criteria = {
                    name:payloadData.word
                };
                let dataToUpdate ={
                    updatedAt:new Date(),
                    $inc:{
                        wordCount:1,
                    },
                    $setOnInsert:{name:payloadData.word,createdAt:new Date(),isDeleted:false}
                };
                let options={ upsert: true};
                const data = await Service.DataServices.updateMultipleData(Models.wordDb,criteria,dataToUpdate,options);
                return UniversalFunctions.sendSuccess(Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, {})
            }
            catch (err) {
                return UniversalFunctions.sendError(err)
            }
        },
        config: {
            tags: ['api', 'words'],
            validate: {
                query: Joi.object({
                    word : Joi.string().required()
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                      payloadType: 'form',
                    responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/words',
        handler: async  (request, h) =>{
            let payloadData = request.query;
            try {

                let criteria = {
                    name:payloadData.word
                };
                let project ={
                    wordCount:1,
                    _id:0,
                };
                let options={ lean: true};
                const data = await Service.DataServices.getData(Models.wordDb,criteria,project,options);
                return UniversalFunctions.sendSuccess(Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,((data.length >0)?data[0]: {wordCount:0}))
            }
            catch (err) {
                return UniversalFunctions.sendError(err)
            }
        },
        config: {
            tags: ['api', 'words'],
            validate: {
                query: Joi.object({
                    word : Joi.string().required()
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                      payloadType: 'form',
                    responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
 ];


