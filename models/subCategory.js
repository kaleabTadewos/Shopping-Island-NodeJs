const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { Category } = require('./category');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    category: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        }, name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255
        }
    }
});

const SubCategory = mongoose.model('SubCategoryy', subCategorySchema);

exports.SubCategory = SubCategory;