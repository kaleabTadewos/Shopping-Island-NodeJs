const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type: String , 
        required : true,
        minlength: 2, 
        maxlength: 255
    }
});

const Category =  mongoose.model('Category' , categorySchema); 

function validateCategoryWithId(category) {
    const schema = {
        _id: Joi.objectId() ,
        name: Joi.string().min(2).max(255).required()
    };

    return Joi.validate(category, schema);
}

function validateCategoryId(category) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(category, schema);
}

function validateCategoryWithOutId(category) {
    const schema = {
        name: Joi.string().min(2).max(255).required()
    };

    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validateWithId = validateCategoryWithId;
exports.validateId = validateCategoryId;
exports.validateWithOutId = validateCategoryWithOutId;