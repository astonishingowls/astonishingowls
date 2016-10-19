//The following is the controllers that interact with the client and database
//to send and/or retrieve database information

//require the mongoose schema models for users and searches
var User = require('../db/dbmodels').User;

module.exports = {

    get: function (req, res) {

        console.log("USER????? LINE 11",user);
        console.log("REQ????? LINE 12",req);
        User.findOne({ 'username': username }, function (err, data) {
          if (err) console.error(err);
        })
        .then( (data) => res.send(data));
    },

    post: function (req, res) {

        console.log("USER????? LINE 25",req.user);
        console.log("REQ????? LINE 26",req);
        // User.findOne({ 'username': username }, function (err, data) {
        //   if (err) console.error(err);
        //   User.savedSearch.push(req.body.array); //this doesn't seem right.... confirm proper syntax!!!
        // })


        // User.findByIdAndUpdate(req.user._id, {
        //     $push: { savedSearch: req.body.John } //input from John
        // }, { 'new': true} )

        User.update(
            { _id: req.user._id },
            { $push: { savedSearch: req.body } }
        )
        // .then( () => res.sendStatus(201));
    }
    
};
