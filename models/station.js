var mongoose = require("mongoose").set("debug", true);

// SCHEMA SETUP
// TODO: change to number maybe for tanks and pricePerLitre
var stationSchema = new mongoose.Schema({
  managerName: String,
  address: String,
  numberOfTanks: String,
  pricePerLitre: String,
  
});

module.exports = mongoose.model("Station", stationSchema);
