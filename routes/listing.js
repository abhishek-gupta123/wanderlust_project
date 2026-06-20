const express = require('express');
const router = express.Router();
const WrapAsync = require('../utils/WrapAsync.js');
const ExpressError = require('../utils/ExpressError');
const { listingSchema, reviewSchema } = require('../schema');
const Listing = require('../models/listing');
const passport = require('passport');
const { isLoggedIn, isOwner } = require('../middleware.js');
const { populate } = require('../models/review.js');
const listingController = require('../controllers/listings.js')
const multer = require('multer')
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage })

//Validation middleware

// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);

//   if (error) {
//     const errMsg = error.details.map(el => el.message).join(",");
//     return next(new ExpressError(400, errMsg));
//   }
//   else {
//     next();

//   }
// };

//index route

router
  .route("/")
  .get(WrapAsync(listingController.index)) // OR router.get('/', WrapAsync(listingController.index));
  .post(isLoggedIn,upload.single('image'), WrapAsync(listingController.createListing))
  // .post(upload.single('image'), (req, res) => {
  //   res.send(req.file);
  // })

// New route
router.get('/new', isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(WrapAsync(listingController.showListings))//Show route
  .put(isLoggedIn, isOwner,upload.single('image'), WrapAsync(listingController.updateListing))//Create Route
  .delete(isLoggedIn, isOwner, WrapAsync(listingController.destroyListing)) //Delete route

//Edit route
router.get('/:id/edit', isLoggedIn, isOwner, WrapAsync(listingController.renderEditForm));

module.exports = router;