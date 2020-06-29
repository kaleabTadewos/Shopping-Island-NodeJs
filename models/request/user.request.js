const Joi = require('joi');

function validateUserWithId(user) {
    const schema = {
        _id: Joi.objectId().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        role: Joi.string(),
        addressId: Joi.objectId().required(),
        state: Joi.string().min(2).max(255).required(),
        city: Joi.string().min(5).max(255).required(),
        street: Joi.string().min(5).max(255).required(),
        zipCode: Joi.string().min(5).max(5).required(),
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        accountNumber: Joi.number().required(),
        expiryDate: Joi.date().required(),
        nameOntheCard: Joi.string().min(5).max(255).required(),
        ccv: Joi.number().required()
    };

    return Joi.validate(user, schema);
}

function validateUserId(user) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(user, schema);
}

function validateUserWithOutId(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        role: Joi.string(),
        addressId: Joi.objectId().required(),
        state: Joi.string().min(2).max(255).required(),
        city: Joi.string().min(5).max(255).required(),
        street: Joi.string().min(5).max(255).required(),
        zipCode: Joi.string().min(5).max(5).required(),
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        accountNumber: Joi.number().required(),
        expiryDate: Joi.date().required(),
        nameOntheCard: Joi.string().min(5).max(255).required(),
        ccv: Joi.number().required()
    };

    return Joi.validate(user, schema);
}

function validateUserNewShppingCart(userShoppingCart) {
    const schema = {
        userId: Joi.objectId().required(),
        itemId: Joi.objectId().required()
    };

    return Joi.validate(userShoppingCart, schema);
}

function validateUserRemoveShoppingCart(canceledShoppingCart) {
    const schema = {
        userId: Joi.objectId().required(),
        shoppingCartId: Joi.objectId().required()
    };

    return Joi.validate(canceledShoppingCart, schema);
}

function validateUserOrderPlacement(userPlaceOrder) {
    const schema = {
        userId: Joi.objectId().required(),
        itemIds: Joi.array().items(Joi.objectId()) ,
        addressId: Joi.objectId().required() , 
        shoppingCartId: Joi.array().items(Joi.objectId())
    };

    return Joi.validate(userPlaceOrder, schema);
} 

function validateUserSingleOrderPlacement(userPlaceSingleOrder) {
    const schema = {
        userId: Joi.objectId().required(),
        itemId: Joi.objectId().required() ,
        addressId: Joi.objectId().required() ,
        shoppingCartId: Joi.objectId().required()
    };

    return Joi.validate(userPlaceSingleOrder, schema);
}

function validateUserBuyNow(userBuyNow) {
    const schema = {
        userId: Joi.objectId().required(),
        itemId: Joi.objectId().required() ,
        addressId: Joi.objectId().required() 
    };

    return Joi.validate(userBuyNow, schema);
}

function validateUserUpdateOrderStatus(userOrderStatus) {
    const schema = {
        userId: Joi.objectId().required(),
        orderId: Joi.objectId().required() ,
        orderStatus: Joi.string().required()
    };

    return Joi.validate(userOrderStatus, schema);
}

function validateUserUpdateStatus(userStatus) {
    const schema = {
        userId: Joi.objectId().required(),
        userStatus: Joi.string().required()
    };

    return Joi.validate(userStatus, schema);
}

exports.validateWithId = validateUserWithId;
exports.validateId = validateUserId;
exports.validateWithOutId = validateUserWithOutId;
exports.validateShoppingCart = validateUserNewShppingCart;
exports.validateOrderPlacement = validateUserOrderPlacement;
exports.validateSingleOrderPlacement = validateUserSingleOrderPlacement;
exports.validateRemoveShoppingCart = validateUserRemoveShoppingCart;
exports.validateBuyNow = validateUserBuyNow;
exports.validateUpdateOrderStatus = validateUserUpdateOrderStatus;
exports.validateUpdateStatus = validateUserUpdateStatus;