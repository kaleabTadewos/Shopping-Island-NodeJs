const { PointCalculator, validateId, validateWithOutId, validateWithId } = require('../models/pointCalculator');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const pointCalculator = await PointCalculator.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', pointCalculator));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const pointCalculator = await PointCalculator.findById(req.params.id);
    if (!pointCalculator) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', pointCalculator));
};

exports.findAll = async(req, res, next) => {
    const pointCalculator = await PointCalculator.find();
    if (!pointCalculator) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', pointCalculator));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const pointCalculator = await PointCalculator.findByIdAndUpdate(req.params.id, {
        totalPerchasedAmount: req.body.totalPerchasedAmount,
        point: req.body.point
    }, { new: true, useFindAndModify: true });
    console.log(pointCalculator);
    pointCalculator.save();
    res.status(200).send(new ApiResponse(200, 'success', pointCalculator));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const pointCalculator = await PointCalculator.findByIdAndRemove(req.params.id);
    if (!pointCalculator) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', pointCalculator));
};