var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var database = require('./db/dbmodels');

var app = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/../client'));

// app.post('/posts', (req, res) => {

//   var newUser = new database.User({
//     "email": req.body.email,
//     "password": req.body.password
//   });
  
//   newUser.save(function(err) {
//     if (err) console.log('Error on save!')
//     else res.sendStatus(201)
//   })
// })


app.listen('port', function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;