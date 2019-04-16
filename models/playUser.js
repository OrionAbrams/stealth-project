const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playUserSchema = new Schema({
  fName: String,
  lName: String,
  companyName: String,
  email: String,
  mobilePhone: String,
  mailingAddress: String,
  actorNames: String,
  nearestCity: String,
  state: String,
  playTitle: String,
  endCity: String,
  endState: String,
  date: { type: Date, default: Date.now }
});

const PlayUser = mongoose.model("PlayUser", playUserSchema);

module.exports = PlayUser;
