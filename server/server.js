var express = require('express');
var bodyparser = require('body-parser');
var database = require('./db/dbmodels');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/../client'));

//configure out server with routing file in /server/config/api-router
require('./config/api-router.js')(app, express);

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

app.set('port',process.env.PORT || 8000);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT",port);

module.exports = app;