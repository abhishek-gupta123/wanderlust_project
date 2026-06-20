const express = require('express');
const router = express.Router({ mergeParams: true });
const WrapAsync = require('../utils/WrapAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schema');
const Review = require('../models/review');
const Listing = require('../models/listing');
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewController = require('../controllers/review');

//Reviews 

//Post route

router.post('/', isLoggedIn, WrapAsync(reviewController.createReview));

//Review Delete Route

router.delete('/:reviewId', isLoggedIn,isReviewAuthor, WrapAsync(reviewController.deleteReview))

module.exports = router;