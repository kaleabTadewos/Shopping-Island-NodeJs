const { SubCategory } = require('../models/subCategory');
const ApiResponse = require('../models/apiResponse');
const { validateId, validateWithOutId, validateWithId } = require('../models/request/subCategory.request');
const ErrorResponse = require('../models/errorResponse');
const { Category } = require('../models/category');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const category = await Category.findById(req.body.categoryId);
    if (!category) res.status(400).send(new ErrorResponse('400', 'Invalid Category Id!'));

    let newSubCategory = new SubCategory({
        name: req.body.name,
        category: category
    });
    const subCategory = await SubCategory.create(newSubCategory);
    res.status(201).send(new ApiResponse(201, 'success', subCategory));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};

//Retrive Operations
exports.findByCategoryId = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const subCategory = await SubCategory.find({ "category._id": req.params.id });
    if (!subCategory) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};

exports.findAll = async(req, res, next) => {
    const subCategories = await SubCategory.find();
    if (!subCategories) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategories));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const category = await Category.findById(req.body.categoryId);
    if (!category) res.status(400).send(new ErrorResponse('400', 'Invalid Category Id!'));
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: category
    }, { new: true, useFindAndModify: true });
    subCategory.save();
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const subCategory = await SubCategory.findByIdAndRemove(req.params.id);
    if (!subCategory) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};