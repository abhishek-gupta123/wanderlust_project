const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render('listings/index', { allListings });
}

module.exports.renderNewForm = (req, res) => {
  res.render('listings/new');

}

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings")
  }
  else {
    res.render('listings/show', { listing });
  }
}

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url,"...",filename)
  let listing = new Listing(req.body);
  listing.owner = req.user._id;
  listing.image = { url, filename };
  await listing.save();
  req.flash("success", "New Listing Created!");
  res.redirect('/listings');
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings")
  }
  else {
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250,h_200");
    res.render('listings/edit', { listing, originalImageUrl })
  }
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price, location, country } = req.body;
  let listing = await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename }
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  console.log(deletedListing)
  res.redirect('/listings');
}