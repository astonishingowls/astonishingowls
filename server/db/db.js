//set up database
var mongoose = require('mongoose');
var mongodb = require('mongodb');

var dbUrl = process.env.MONGOURI || 'mongodb://heroku_s13dqq10:c5b7hlbujuecnetp4mppna4p43@ds057386.mlab.com:57386/heroku_s13dqq10'

mongoose.connect(dbUrl, function(err, res) {
  if (err) console.error('ERROR connecting to: ' + dbUrl + '. ' + err)
  else console.log('Successfully connected to: ' + dbUrl)
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

module.exports = db;