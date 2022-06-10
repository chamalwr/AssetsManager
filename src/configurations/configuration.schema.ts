import * as Joi from "joi";

const ConfigurationValidationSchema = Joi.object({
    service: {
        port: Joi.number().required().default(3000),
    },
    graphql: {
        playground: Joi.boolean().required().default(false),
        introspection: Joi.boolean().required().default(false)
    },
    dataSources : {
        mongodb: {
            uri: Joi.string().required(),
            dbName: Joi.string().required(),
        }
    }
});

export default ConfigurationValidationSchema;