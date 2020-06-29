const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    review: [{
        reviewText: {
            type: String
        },
        reviewStatus: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'DISAPPROVED'],
            default: 'PENDING'
        }

    }],
});

const Review = mongoose.model('Review', reviewSchema);

function validateReviewWithId(review) {
    const schema = {
        _id: Joi.objectId().required(),
        userId: Joi.objectId().required(),
        productId: Joi.objectId().required(),
        text: Joi.string().required()
    };

    return Joi.validate(review, schema);
}

function validateReviewId(review) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(review, schema);
}

function validateReviewWithOutId(review) {
    const schema = {
        userId: Joi.objectId().required(),
        productId: Joi.objectId().required(),
        text: Joi.string().required()
    };

    return Joi.validate(review, schema);
}

exports.Review = Review;
exports.validateWithId = validateReviewWithId;
exports.validateId = validateReviewId;
exports.validateWithOutId = validateReviewWithOutId;