var express = require('express');
var bodyparser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var database = require('./db/dbmodels');

var debug = require('debug')('passport-mongo');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'ncrJtdcz9VO0xttHEJpKnvIVt',
  consumer_secret: '9mVZW1Dh8GIDO39Yc6C4HpPRQUdnG0fAy93FrESqJFoiE7Wx2Z',
  access_token_key: '792024168267124736-pLzTXeMaXDfm9QiM9s6s6sAZbqOHf4L',
  access_token_secret: 'uf9waFFb9jkpExjtrngEEsrDnLqMCacDvRJI03Na9VLd4'
});

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
  .catch(function(err){
    console.error("Currency not found")
  })
  .then(function(){
    client.post('statuses/update', {status: 'Checkout My Positions: ' + req.body[0].cxy + ', Purchased $'+ req.body[0].boughtAmount + ' Executed By Trader: ' + req.user.username},  function(error, tweet, response) {
    if(error) console.log(error);
    console.log('++++++++BODY', req.body)
    console.log('++++++++DATA', req.data)
    console.log(tweet);  // Tweet body.
    // console.log(response);  // Raw response object.
    });
  })
  // .then(function(){
  //   client.stream('statuses/filter', {track: req.body[0].cxy}, function(stream) {
  //   stream.on('data', function(event) {
  //     console.log(event && event.text);
  //   });
  //
  //  stream.on('error', function(error) {
  //   throw error;
  //  });
  // });
  // })

  .then( () => res.status(201).send(req.data));

});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//End of database stuff

// configure passport
passport.use(new localStrategy(database.User.authenticate()));
passport.serializeUser(database.User.serializeUser());
passport.deserializeUser(database.User.deserializeUser());

passport.use(new GoogleStrategy({
    clientID: "714313995643-muhg5t6obmuokajn432hbaaj50v27ko9.apps.googleusercontent.com",
    clientSecret: "PpedpdIu6NKl4ww-EsK2M2Aw",
    callbackURL: "https://localhost:8000//auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

passport.serializeUser(function(user, callback){
        console.log('serializing user.');
        callback(null, user.id);
    });

passport.deserializeUser(function(user, callback){
       console.log('deserialize user.');
       callback(null, user.id);
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
