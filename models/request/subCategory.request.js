const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateSubCategoryWithId(subCategory) {
    const schema = {
        _id: Joi.objectId().required(),
        name: Joi.string().min(2).max(255).required(),
        categoryId: Joi.objectId().required()
    };

    return Joi.validate(subCategory, schema);
}

function validateSubCategoryId(subCategory) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(subCategory, schema);
}

function validateSubCategoryWithOutId(subCategory) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        categoryId: Joi.objectId().required()
    };

    return Joi.validate(subCategory, schema);
}

exports.validateWithId = validateSubCategoryWithId;
exports.validateId = validateSubCategoryId;
exports.validateWithOutId = validateSubCategoryWithOutId;