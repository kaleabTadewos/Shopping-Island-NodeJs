const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
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
        }

    },
    unit: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    isPurchased: {
        type: Boolean,
        default: false,
    },
    stockQuantity: {
        type: Number,
        required: true
    }
});

exports.Item = mongoose.model('Item', itemSchema);