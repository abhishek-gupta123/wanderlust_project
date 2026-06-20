const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    url : String,
    filename: String,
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
  },
  country: {
    type: String
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
  }
});

listingSchema.post("findOneAndDelete", async (data) => {
  if (data.reviews.length) {
    let res = await review.deleteMany({ _id: { $in: data.reviews } });
    console.log(res);
  }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;