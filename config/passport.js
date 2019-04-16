var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user");

// commented out most of this because unecessary with passport-local-mongoose npm

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(
//   new LocalStrategy(
//     // Our user will sign in using an email, rather than a "username"
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//     function(email, password, done) {
//       // When a user tries to sign in this code runs
//       db.User.find({
//           email: email
//       }).then(function(dbUser) {
//         // If there's no user with the given email
//         if (!dbUser) {
//           return done(null, false, {
//             message: "We can't find that email in our data storages..."
//           });
//         }
//         // If there is a user with the given email, but the password the user gives us is incorrect
//         else if (!dbUser.validPassword(password)) {
//           return done(null, false, {
//             message: "Incorrect password."
//           });
//         }
//         // If none of the above, return the user
//         return done(null, dbUser);
//       });
//     }
//   )
// );

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
