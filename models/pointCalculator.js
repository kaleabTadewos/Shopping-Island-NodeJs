const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const pointCalculatorSchema = new mongoose.Schema({
    totalPerchasedAmount: {
        type: Number,
        required: true
    },
    point: {
        type: Number,
        required: true
    }
});


function validatePointCalculatorWithId(totalPerchasedAmount) {
    const schema = {
        _id: Joi.objectId(),
        totalPerchasedAmount: Joi.number().required(),
        point: Joi.number().required()
    };

    return Joi.validate(totalPerchasedAmount, schema);
}

function validatePointCalculatorId(totalPerchasedAmount) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(totalPerchasedAmount, schema);
}

function validatePointCalculatorWithOutId(totalPerchasedAmount) {
    const schema = {
        totalPerchasedAmount: Joi.number().required(),
        point: Joi.number().required()
    };

    return Joi.validate(totalPerchasedAmount, schema);
}

exports.PointCalculator = mongoose.model('PointCalculator', pointCalculatorSchema);
exports.validateWithId = validatePointCalculatorWithId;
exports.validateId = validatePointCalculatorId;
exports.validateWithOutId = validatePointCalculatorWithOutId;