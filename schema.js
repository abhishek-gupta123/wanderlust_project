
//Schema for validating listing data
const Joi = require('joi');
// const reviews = require('./models/review');

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  location: Joi.string().required(),

  country: Joi.string().required(),

  price: Joi.number().required().min(0),

  image: Joi.object({
    url: Joi.string().allow("", null)
  })

});

module.exports.reviewSchema = Joi.object({
  reviews: Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required()
  }).required()
});