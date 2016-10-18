var db = require('./db');
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var models = {};

//Uses passport-local-mongoose to create users with this schema
//the passport module automatically hashes the user's inputted password for you
var userSchema = new mongoose.Schema({
  savedSearch: {
      "currencies": String, // three-letter string, i.e. EUR
      "historicalDate": String //in format 'YYYY-MM-DD'
  }
});
userSchema.plugin(passportLocalMongoose);
models.User = mongoose.model('User', userSchema);


// //Saved list of all searches. This links to individual users by creating the "user" array
// //directly within the object
// var searchSchema = new mongoose.Schema({
//   "id": Number,
//   "text": String, //this will represent currencies in comma-separated values, i.e. 'EUR,GBP,HKD'
//   "historicalDate": String //has to be in this format: 'YYYY-MM-DD'
// });
// models.Search = mongoose.model('Search', searchSchema);

module.exports = models;