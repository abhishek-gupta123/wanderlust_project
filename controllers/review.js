const Review = require('../models/review');
const Listing = require('../models/listing')
module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.reviews);
  newReview.author = req.user._id;
  console.log(newReview)
  listing.reviews.push(newReview);
  req.flash("success", "Review Added!");
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`)

}

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/listings/${id}`)
}