const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateItemWithId(item) {
    const schema = {
        _id: Joi.objectId().required(),
        price: Joi.number().required(),
        stockQuantity: Joi.number().required()

    };

    return Joi.validate(item, schema);
}

function validateItemId(item) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(item, schema);
}

function validateItemWithOutId(item) {
    const schema = {
        productId: Joi.objectId().required(),
        unitId: Joi.objectId().required(),
        price: Joi.number().required(),
        isPurchased: Joi.boolean(),
        stockQuantity: Joi.number().required()
    };

    return Joi.validate(item, schema);
}

exports.validateWithId = validateItemWithId;
exports.validateId = validateItemId;
exports.validateWithOutId = validateItemWithOutId;