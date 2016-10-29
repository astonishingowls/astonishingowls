var express = require('express');

var google = require('googleapis');
var prediction = google.prediction('v1.6');
var key = require('./Currency');

// // obtain a JWT-enabled version of request
// var request = require('google-oauth-jwt').requestWithJWT();

module.exports = function(app,express){


  // app.post('/api/predict', (req,res) => {
  //   request({
  //     url: 'https://www.googleapis.com/prediction/v1.6/projects/currency-147719/trainedmodels/JPY/predict',
  //     jwt: {
  // // use the email address of the service account, as seen in the API console
  //     email: 'currency-147719@appspot.gserviceaccount.com',
  // // use the PEM file we generated from the downloaded key
  //     keyFile: 'Currency-11b02d892798.pem',
  // // specify the scopes you wish to access - each application has different scopes
  //     scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/prediction']
  //     }
  //   }, function (err, response, body) {
  //     console.log(response)
  //     // console.log(JSON.parse(body));
  //     res.send(response.body);
  //   });
  // });

  app.get('/api/predict', (req,res) => {

    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/prediction'],
      null
    );

    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      }

   var request = {
          // TODO: Change placeholders below to appropriate parameter values for the 'predict' method:

          // * The project associated with the model.
      project: "",

          // * The name of a hosted model.
      hostedModelName: "",

      resource: {},

          // Auth client
      auth: jwtClient
    };

    prediction.hostedmodels.predict(request, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
});


};
