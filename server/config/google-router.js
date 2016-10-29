var express = require('express');
var currency = require('./Currency')

// obtain a JWT-enabled version of request
var request = require('google-oauth-jwt').requestWithJWT();

module.exports = function(app,express){


  app.post('/api/predict', (req,res) => {
    request({
      url: 'https://www.googleapis.com/prediction/v1.6/projects/currency-147719/trainedmodels/JPY/predict',
      jwt: {
  // use the email address of the service account, as seen in the API console
      email: 'currency-147719@appspot.gserviceaccount.com',
  // use the PEM file we generated from the downloaded key
      keyFile: currency,
  // specify the scopes you wish to access - each application has different scopes
      scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/prediction']
      }
    }, function (err, res, body) {
      console.log(JSON.parse(body));
    });
  });

  // app.get('/api/getHistorical', (req,res) => {
  //   //Get historical exchange rates for any date available from the Open Exchange Rates API.
  //   //Like latest.json, the /historical route provides a standard response object containing
  //   //all the conversion rates for all available symbols/currencies on your requested date,
  //   //labeled by their international-standard 3-letter ISO currency codes.
  //   //Historical data are End-Of-Day values, and are currently available from Jan 1st, 1999.
  //   //NOTE: DATE IS IN YYYY-MM-DD FORMAT!!, i.e. '2001-02-16'
  //   //For more info: https://docs.openexchangerates.org/docs/historical-json
  //   var url = 'https://openexchangerates.org/api/historical/'+req.query.date+'.json?app_id='+api_key;
  //   request(url, function(err,response,body){
  //     if(err){ console.error("error downloading data via getHistorical");}
  //     else {
  //       res.send(response.body);
  //     }
  //   });
  // });


};
