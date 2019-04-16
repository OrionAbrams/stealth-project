const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const netflixUserSchema = new Schema({
  fName: String,
  lName: String,
  companyName: String,
  email: String,
  mobilePhone: String,
  mailingAddress: String,
  actorNames: String,
  nearestCity: String,
  state: String,
  seriesTitle: String,
  endCity: String,
  endState: String,
  date: { type: Date, default: Date.now }
});

const NetflixUser = mongoose.model("NetflixUser", netflixUserSchema);

module.exports = NetflixUser;
