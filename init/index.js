const mongoose = require("mongoose");
const initData = require('./data');
const Listing = require('../models/listing');

main().then((res) => console.log("Connected to MongoDB")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

const intiDB = async () => {
  
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "6a2e4b99af9b8d97d045a4c3" }))
  await Listing.insertMany(initData.data);
  console.log("DAta was initialized!")
}

intiDB();