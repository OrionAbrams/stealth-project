var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now},
    // new were supposed to expire after 5 days in project, taking out for now to have users that don't expire in portfolio.
    // expireAt: {
    //   type: Date,
    //   default: Date.now,
    //   index: {expires: '5d'}
    // }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);