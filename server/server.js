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
var controller = require('./controllers/index');


var app = express();
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

//configure out server with routing file in /server/config/api-router
require('./config/api-router.js')(app, express);





//These are routers for helper functions that ping the database

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
//End of database stuff






// configure passport
passport.use(new localStrategy(database.User.authenticate()));
passport.serializeUser(database.User.serializeUser());
passport.deserializeUser(database.User.deserializeUser());

// require routes
var routes = require('./config/routes.js');
app.use('/user/', routes);

app.set('port',process.env.PORT || 8000);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT",port);

module.exports = app;
