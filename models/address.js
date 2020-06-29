const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const addressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    addressString: {
        type: String,
        required: true
    }
});


function validateUnitWithId(address) {
    const schema = {
        _id: Joi.objectId(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().required()

    };

    return Joi.validate(address, schema);
}

function validateUnitId(address) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(address, schema);
}

function validateUnitWithOutId(address) {
    const schema = {
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().required()
    };

    return Joi.validate(address, schema);
}

exports.Address = mongoose.model('ShippingAddress', addressSchema);
exports.validateWithId = validateUnitWithId;
exports.validateId = validateUnitId;
exports.validateWithOutId = validateUnitWithOutId;