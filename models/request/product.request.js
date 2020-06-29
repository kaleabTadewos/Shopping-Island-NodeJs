const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateProductWithId(product) {
    const schema = {
        _id: Joi.objectId().required(),
        name: Joi.string().min(2).max(255).required(),
        userId: Joi.objectId().required(),
        description: Joi.string().min(10).max(500).required(),
        imageUrl: Joi.string(),
        subCategoryId: Joi.objectId().required(),

    };

    return Joi.validate(product, schema);
}

function validateProductId(product) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(product, schema);
}

function validateProductWithOutId(product) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        userId: Joi.objectId().required(),
        description: Joi.string().min(10).max(500).required(),
        imageUrl: Joi.string(),
        subCategoryId: Joi.objectId().required()
    };

    return Joi.validate(product, schema);
}

exports.validateWithId = validateProductWithId;
exports.validateId = validateProductId;
exports.validateWithOutId = validateProductWithOutId;