//The following is the routing logic for the back-end API calls

var express = require('express');
var api_key = require('./api-key')(); //invokes method established in api-key.js to give the API key
var request = require('request');

module.exports = function(app,express){

  //functions written out to download data from external API
  app.get('/api/getAll', (req,res) => {
    //Get the latest exchange rates available from the Open Exchange Rates API.
    //For more info: https://docs.openexchangerates.org/docs/latest-json
    var url = 'https://openexchangerates.org/api/latest.json?app_id='+api_key;
    request(url, function(err,response,body){
      if(err){ console.error("error downloading data via getAllLatest");}
      else {
        res.send(response.body);
      }
    });
  });

  app.get('/api/getHistorical', (req,res) => { //confirm with John
    //Get historical exchange rates for any date available from the Open Exchange Rates API.
    //Like latest.json, the /historical route provides a standard response object containing
    //all the conversion rates for all available symbols/currencies on your requested date,
    //labeled by their international-standard 3-letter ISO currency codes.
    //Historical data are End-Of-Day values, and are currently available from Jan 1st, 1999.
    //NOTE: DATE IS IN YYYY-MM-DD FORMAT!!, i.e. '2001-02-16'
    //For more info: https://docs.openexchangerates.org/docs/historical-json
    var url = 'https://openexchangerates.org/api/historical/'+req.query.date+'.json?app_id='+api_key;
    request(url, function(err,response,body){
      if(err){ console.error("error downloading data via getHistorical");}
      else {
        res.send(response.body);
      }
    });
  });

  app.get('/api/getListOfCurrencies', (req,res) => {
    //Get a JSON list of all currency symbols available from the Open Exchange Rates API,
    //along with their full names, for use in your integration.
    //This list will always mirror the currencies available in the latest rates (given as their 3-letter codes).
    //For more info: https://docs.openexchangerates.org/docs/currencies-json
    var url = 'https://openexchangerates.org/api/currencies.json';
    request(url, function(err,response,body){
      if(err){ console.error("error downloading list of currencies");}
      else {
        res.send(response.body);
      }
    });
  });

};