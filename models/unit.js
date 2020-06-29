const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


function validateUnitWithId(unit) {
    const schema = {
        _id: Joi.objectId(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    };

    return Joi.validate(unit, schema);
}

function validateUnitId(unit) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(unit, schema);
}

function validateUnitWithOutId(unit) {
    const schema = {
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    };

    return Joi.validate(unit, schema);
}

exports.Unit = mongoose.model('Unit', unitSchema);
exports.validateWithId = validateUnitWithId;
exports.validateId = validateUnitId;
exports.validateWithOutId = validateUnitWithOutId;