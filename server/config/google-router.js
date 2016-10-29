var express = require('express');

var google = require('googleapis');
var prediction = google.prediction('v1.6');
// var key = require('./Currency');

var jwtClient = new google.auth.JWT(
  process.env.client_email || key.client_email,
  null,
  process.env.private_key || key.private_key,
  ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/prediction'],
  null
);


module.exports = function(app,express){
  app.get('/api/predict', (req,res) => {
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      }

      var request = {
        // TODO: Change placeholders below to appropriate parameter values for the 'predict' method:

        // * The project associated with the model.
        project: "currency-147719",


        // Auth client
        auth: jwtClient
      };

       prediction.trainedmodels.list(request, function(err, result) {
           if (err) {
             console.log(err);
           } else {
             console.log(result);
             res.send(result);
           }
         });
     });
  });


  app.post('/api/predict', (req,res) => {
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      }

      var request = {
        // TODO: Change placeholders below to appropriate parameter values for the 'predict' method:

        // * The project associated with the model.
        project: "currency-147719",

        // * The name of a trained model.
        id: req.body.currency,

        resource: req.body.query,

        // Auth client
        auth: jwtClient
      };

      prediction.trainedmodels.predict(request, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result, 'this is the result');
          res.send(result);
        }
      });
    });
  });


};
