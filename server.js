const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes");
const passport = require("./config/passport")
const app = express();

//need to send this to front end
const adminPass = process.env.ADMINPASS

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport setup
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Use apiRoutes
app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/genericdatabase");


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
