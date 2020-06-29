const { Item } = require('../models/item');
const ApiResponse = require('../models/apiResponse');
const { validateId, validateWithOutId, validateWithId } = require('../models/request/item.request');
const ErrorResponse = require('../models/errorResponse');
const { Product } = require('../models/product');
const { Unit } = require('../models/unit');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));

    const product = await Product.findById(req.body.productId);
    if (!product) res.status(400).send(new ErrorResponse('400', 'Invalid Product Id!'));

    const unit = await Unit.findById(req.body.unitId);
    if (!unit) res.status(400).send(new ErrorResponse('400', 'Invalid unit Id!'));

    product.itemCount += 1;
    if (req.body.price < product.minPrice) product.minPrice = req.body.price;
    if (req.body.price > product.maxPrice) product.maxPrice = req.body.price;

    const updatedProduct = await product.save();

    let newItem = new Item({
        product: updatedProduct,
        unit: unit,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity
    });

    const item = await Item.create(newItem);

    res.status(201).send(new ApiResponse(201, 'success', item));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', item));
};

exports.findByProductId = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const item = await Item.find({ "product._id": req.params.id });
    if (!item) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', item));
};

exports.findAll = async(req, res, next) => {
    const items = await Item.find();
    if (!items) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', items));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const item = await Item.findByIdAndUpdate(req.params.id, {
        price: req.body.price,
        stockQuantity: req.body.stockQuantity
    }, { new: true, useFindAndModify: true });
    item.save();
    res.status(200).send(new ApiResponse(200, 'success', item));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const item = await Item.findByIdAndRemove(req.params.id);
    if (!item) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', item));
};