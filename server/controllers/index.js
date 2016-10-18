//The following is the controllers that interact with the client and database
//to send and/or retrieve database information

//require the mongoose schema models for users and searches
var models = require('../db/dbmodels');

//require this because we want to be able to grab the user
var routes = require('../config/routes');


console.log("routes.user++++++++++",routes.user);

module.exports = {
    searches: {
        get: function (req, res) {
           // db.Message.findAll({include: [db.User]})
           //     .then(function (messages) {
           //         res.json(messages);
           //     });


            User.findOne({ 'username': 'Ghost' }, 'name occupation', function (err, person) {
              if (err) return handleError(err);
              console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
            })
        },
        // post: function (req, res) {
        //    db.User.findOrCreate({where: {username: req.body.username}})
        //        // findOrCreate returns multiple resutls in an array
        //        // use spread to assign the array to function arguments
        //        .spread(function (user, created) {
        //            db.Message.create({
        //                userid: user.get('id'),
        //                text: req.body.message,
        //                roomname: req.body.roomname
        //            }).then(function (message) {
        //                res.sendStatus(201);
        //            });
        //        });
        // }
    },

    // users: {
    //     get: function (req, res) {
    //        db.User.findAll()
    //            .then(function (users) {
    //                res.json(users);
    //            });
    //     },
    //     post: function (req, res) {
    //        db.User.findOrCreate({where: {username: req.body.username}})
    //            // findOrCreate returns multiple resutls in an array
    //            // use spread to assign the array to function arguments
    //            .spread(function (user, created) {
    //                res.sendStatus(created ? 201 : 200);
    //            });
    //     }
    // }
};

//Copying schema over just so that we have it

// var searchSchema = new mongoose.Schema({
//   "id": Number,
//   "text": String, //this will represent currencies in comma-separated values, i.e. 'EUR,GBP,HKD'
//   "historicalDate": String //has to be in this format: 'YYYY-MM-DD'
//   "user": [
//     {type: Schema.Types.ObjectId, ref: 'User'}
//   ]
// });