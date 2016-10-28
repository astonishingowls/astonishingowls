var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var database = require('./db/dbmodels');
var oauth = require('./oauth.js');

var debug = require('debug')('passport-mongo');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//initiate express
var app = express();

//middleware
app.use(bodyparser.urlencoded({extended: true}));
// app.use(bodyparser.json();
app.use(bodyparser());
app.use(logger('dev'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client'));

//configure our server with routing file in /server/config/api-router
require('./config/api-router.js')(app, express);

//These are routers for helper functions that ping the database
//GET and POST requests to the database are written here
app.get('/database', (req, res) => {
  var id = req.user._id;
  database.User.findById(id, function (err, doc){
    if(err){ console.log("Not appropriately getting info from the database"); }
    console.log(doc);
  })
  .then( (arrayOfArrays) => res.status(200).send(arrayOfArrays));
});

app.post('/database', (req, res) => {
  database.User.update(
    { _id: req.user._id },
    { $push: { savedSearch: req.body } }
  )
  .then( () => res.status(201).send(req.data));
});

// route for authtication with google passport
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// route for if google authentication is successful redirect to dashboard
// otherwise redirect to login
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//End of database stuff

// configure passport
passport.use(new localStrategy(database.User.authenticate()));
// passport.serializeUser(database.User.serializeUser());
// passport.deserializeUser(database.User.deserializeUser());

// configure google passport
// oauth is exported from oauth.js
passport.use(new GoogleStrategy({
  clientID: oauth.google.clientID,
  clientSecret: oauth.google.clientSecret,
  callbackURL: oauth.google.callbackURL,
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done){
        console.log('serializing user.');
        done(null, user);
    });

passport.deserializeUser(function(obj, done){
       console.log('deserialize user.');
       done(null, obj);
    });


// require routes
var routes = require('./config/routes.js');
app.use('/user/', routes);

//set and run the port and server
app.set('port',process.env.PORT || 8000);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT",port);

module.exports = app;
