var db = require('./db');
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var models = {};

//Uses passport-local-mongoose to create users with this schema
//the passport module automatically hashes the user's inputted password for you
var userSchema = new mongoose.Schema({
  //we don't need the username and hashed password templated here because passport 
  //does that for you
  savedSearch: Array
});
userSchema.plugin(passportLocalMongoose);
models.User = mongoose.model('User', userSchema);

module.exports = models;

    // //Each is an object representing different points in time
    // { time: String, cxy: String, date: String, value: Number}, //as of point in time downloaded
    // { time: String, cxy: String, date: String, value: Number}, //as of one week ago
    // { time: String, cxy: String, date: String, value: Number}, //as of last month
    // { time: String, cxy: String, date: String, value: Number} //as of one year ago