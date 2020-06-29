const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Bank = mongoose.model('Bank', bankSchema);

function validateBankWithId(bank) {
    const schema = {
        _id: Joi.objectId().required(),
        userId: Joi.objectId().required(),
        balance: Joi.number().required()
    };

    return Joi.validate(bank, schema);
}

function validateBankId(bank) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(bank, schema);
}

function validateBankWithOutId(bank) {
    const schema = {
        userId: Joi.objectId().required(),
        balance: Joi.number().required()
    };

    return Joi.validate(bank, schema);
}

exports.Bank = Bank;
exports.validateWithId = validateBankWithId;
exports.validateId = validateBankId;
exports.validateWithOutId = validateBankWithOutId;