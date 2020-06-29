const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const { string } = require('joi');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    imageUrl: {
        type: String
    },
    subCategory: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
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
            },
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255
            }
        }
    },
    minPrice: {
        type: Number,
        default: 0
    },
    maxPrice: {
        type: Number,
        default: 0
    },
    itemCount: {
        type: Number,
        default: 0
    },
    searchCriteria: {
        type: String,
        required: true
    },

    productReviews: [{
        review: {
            fullName: {
                type: String,
            },
            userId: {
                type: mongoose.Types.ObjectId,
            },
            text: {
                type: String
            },
            reviewStatus: {
                type: String,
                enum: ['PENDING', 'APPROVED', 'DISAPPROVED'],
                default: 'PENDING'
            }
        }
    }]
});

exports.Product = mongoose.model('Product', productSchema);