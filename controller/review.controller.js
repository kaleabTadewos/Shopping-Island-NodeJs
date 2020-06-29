const { Review, validateId, validateWithOutId, validateWithId } = require('../models/review');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    let review = {};
    review = await Review.findOne({ $and: [{ userId: req.body.userId }, { productId: req.body.productId }] }, { userId: 1, productId: 1, text: 1 })
    if (review) {
        await Review.findByIdAndUpdate(review._id, {
            $push: {
                review: {
                    reviewText: req.body.text,
                    reviewStatus: 'PENDING'
                }
            }
        }, { new: true, useFindAndModify: true })
    } else {


        let reviews = {
            reviewText: req.body.text
        }
        let newReview = new Review({
            userId: req.body.userId,
            productId: req.body.productId,
            review: [reviews]
        });

        console.log(newReview.review);
        review = await Review.create(newReview);
    }
    res.status(201).send(new ApiResponse(201, 'success', review));
};
//
exports.reviewStatus = async(req, res, next) => {
    const reviews = await Review.findById(req.body.reviewId);
    if (!reviews) res.status(400).send(new ErrorResponse('400', 'no content found!'));
    console.log('One')
    let newReview = {};
    reviews.review.forEach((rev) => {
        if (rev._id == req.body.textId) {
            newReview = rev;
            console.log(newReview)
            newReview.reviewStatus = req.body.reviewStatus
                //review.reviewStatus = req.body.reviewStatus;
            console.log('www', newReview.reviewStatus);
        }
    });
    if (!newReview) return res.status(400).send(new ErrorResponse('400', 'no content found!'));
    console.log(newReview);
    await Review.findByIdAndUpdate(req.body.reviewId, {
        $pull: { review: { _id: req.body.textId } },
    }, { new: true, useFindAndModify: true });

    //const prod = await Product.findById(req.body.productId);
    const re = await Review.findByIdAndUpdate(req.body.reviewId, {
        $push: { review: newReview }
    }, { new: true, useFindAndModify: true });
    res.status(200).send(new ApiResponse(200, 'success', re));
};

exports.findByProductId = async(req, res, next) => {
    // const { error } = validateWithOutId(req.body);
    // if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    let reviews = [];

    review = await Review.find({ productId: req.body.productId });
  
    // rev.forEach((re) => {
    //     re.review.forEach((r) => {
    //         if (r.reviewStatus == "APPROVED") {
    //             reviews.push(r);
    //         }
    //     });
    // });
    res.status(200).send(new ApiResponse(200, 'success', review[0]));
}