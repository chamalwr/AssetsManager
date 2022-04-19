import * as Joi from "joi";

const ConfigurationValidationSchema = Joi.object({
    _id: Joi.string().required(),
    service: {
        name: Joi.string().required(),
        stage: Joi.string().required(),
        port: Joi.number().required().default(3000),
    },
    graphql: {
        introspection: Joi.boolean().required().default(false)
    },
    dataSources : {
        mongodb: {
            uri: Joi.string().required(),
        }
    }
});

export default ConfigurationValidationSchema;