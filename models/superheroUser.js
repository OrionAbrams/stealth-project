const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const superheroUserSchema = new Schema({
  fName: String,
  lName: String,
  companyName: String,
  email: String,
  mobilePhone: String,
  mailingAddress: String,
  actorNames: String,
  nearestCity: String,
  state: String,
  planet: String,
  powers: String,
  date: { type: Date, default: Date.now }
});

const SuperheroUser = mongoose.model("SuperheroUser", superheroUserSchema);

module.exports = SuperheroUser;
