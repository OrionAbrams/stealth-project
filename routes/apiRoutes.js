const axios = require("axios");
const router = require("express").Router();
const passport = require("../config/passport");
const db = require("../models")
const User = require("../models/user")
require("dotenv").config();
var incomingUserObject
var keys = require("../keys")
var apiKey = keys.hellosign.apiKey
var emailForAgreement
var nameForAgreement

var templateIds = {
  play: '544eee3d2d1e9c79b3261ca90942109a55da49c2',
  netflix: '34e60e6378fc427114e7965ddd74c23aa28276b', 
  superhero: 'd98484473288a5d5cd2bb4113bb995c3e03ca86b'
}


// using env api key here for hellosign
const hellosign = require('hellosign-sdk')({ key: apiKey });
console.log(apiKey)
let opts = {
  test_mode: 1,
  template_id: '',
  title: 'Entertainment contract',
  subject: 'The contract you signed up for',
  message: 'Please check that all the information you entered in the form is correct and submit another form if not. Thank you and have a great day!',
  signers:
    [{
      email_address: emailForAgreement,
      name: nameForAgreement,
      role: 'client'
    }]
  ,
  custom_fields: {
    fName: 'placeholder first name'
  }
};

function clean(obj) {
  delete obj.email
  delete obj.movieTitle
  delete obj.tvTitle
  delete obj.planet
  delete obj.powers
  for (var propName in obj) {
    if (obj[propName] === '' || obj[propName] === null) {
      delete obj[propName];
    }
  }
  return obj
}

function cleanNetflix(obj) {
  delete obj.email
  delete obj.movieTitle
  delete obj.playTitle
  delete obj.planet
  delete obj.powers
  console.log(obj)
  delete obj.desiredInterDate
  for (var propName in obj) {
    if (obj[propName] === '' || obj[propName] === null) {
      delete obj[propName];
    }
  }
  return obj
}

function cleanSuperhero(obj) {
  delete obj.email
  delete obj.tvTitle
  delete obj.playTitle
  delete obj.endCity
  delete obj.endState
  console.log(obj)
  delete obj.desiredInterDate
  for (var propName in obj) {
    if (obj[propName] === '' || obj[propName] === null) {
      delete obj[propName];
    }
  }
  return obj
}

// needed for making admin user... can also hardcode in an admin pass here, if want to hide from public use env and heroku config
// const adminPass = process.env.ADMINPASS
const adminPass = "bestProducer"

router.get("/adminpass", (req, res) => {
  res.json(adminPass)
})

router.get("/playusers", (req, res) => {
  db.PlayUser.find({}, function (err) {
    if (err) {
      console.log('error! ', err);
      return next(err);
    }
  }).then((data) => {
    res.send(data)
  })
})

router.get("/netflixusers", (req, res) => {
  db.NetflixUser.find({}, function (err) {
    if (err) {
      console.log('error! ', err);
      return next(err);
    }
  }).then((data) => {
    res.send(data)
  })
})

router.get("/superherousers", (req, res) => {
  db.SuperheroUser.find({}, function (err) {
    if (err) {
      console.log('error! ', err);
      return next(err);
    }
  }).then((data) => {
    res.send(data)
  })
})

router.post("/playusers", (req, res) => {
  incomingUserObject = ""
  emailForAgreement = req.body.email
  nameForAgreement = req.body.fName + " " + req.body.lName
  incomingUserObject = req.body
  console.log(incomingUserObject)
  db.PlayUser.create(req.body)
    .then((data) => {
      res.json(data)
    }).then(() => {
      incomingUserObject = clean(incomingUserObject)
      opts = {
        test_mode: 1,
        template_id: templateIds.play,
        title: 'Entertainment contract',
        subject: 'The contract you signed up for',
        message: 'Please check that all the information you entered in the form is correct and submit another form if not. Thank you and have a great day!',
        signers:
          [{
            email_address: emailForAgreement,
            name: nameForAgreement,
            role: 'client'
          }]
        ,
        custom_fields: incomingUserObject
      };
    }).catch((err) => {
      console.log(err)
    }).then(() => {
      hellosign.signatureRequest.sendWithTemplate(opts).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    })
})

router.post("/netflixusers", (req, res) => {
  incomingUserObject = ""
  emailForAgreement = req.body.email
  nameForAgreement = req.body.fName + " " + req.body.lName
  incomingUserObject = req.body

  console.log(incomingUserObject)
  db.NetflixUser.create(req.body)
    .then((data) => {
      res.json(data)
    }).then(() => {
      incomingUserObject = cleanNetflix(incomingUserObject)
      console.log(incomingUserObject)
      opts = {
        test_mode: 1,
        template_id: templateIds.netflix,
        title: 'Entertainment contract',
        subject: 'The contract you signed up for',
        message: 'Please check that all the information you entered in the form is correct and submit another form if not. Thank you and have a great day!',
        signers:
          [{
            email_address: emailForAgreement,
            name: nameForAgreement,
            role: 'client'
          }]
        ,
        custom_fields: incomingUserObject
      };
    }).catch((err) => {
      console.log(err)
    }).then(() => {
      hellosign.signatureRequest.sendWithTemplate(opts).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    })
})

router.post("/superherousers", (req, res) => {
  incomingUserObject = ""
  emailForAgreement = req.body.email
  nameForAgreement = req.body.fName + " " + req.body.lName
  incomingUserObject = req.body

  console.log(incomingUserObject)
  db.SuperheroUser.create(req.body)
    .then((data) => {
      res.json(data)
    }).then(() => {
      incomingUserObject = cleanSuperhero(incomingUserObject)
      console.log(incomingUserObject)
      opts = {
        test_mode: 1,
        template_id: templateIds.superhero,
        title: 'Entertainment contract',
        subject: 'The contract you signed up for',
        message: 'Please check that all the information you entered in the form is correct and submit another form if not. Thank you and have a great day!',
        signers:
          [{
            email_address: emailForAgreement,
            name: nameForAgreement,
            role: 'client'
          }]
        ,
        custom_fields: incomingUserObject
      };
      console.log(opts)
    }).catch((err) => {
      console.log(err)
    }).then(() => {
      hellosign.signatureRequest.sendWithTemplate(opts).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    })
})
router.get('/login', function (req, res) {
  res.json('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

router.post('/users', function (req, res, next) {
  console.log('registering user');
  User.register(new User({ username: req.body.username }), req.body.password, function (err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    res.redirect('/');
  });
});

module.exports = router;