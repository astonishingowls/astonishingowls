var express = require('express');
// var api = express.Router();
var utils = require('./utils');
var api_key = 'be114d521d8940e1b03aaed7cc810422';
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
    console.log(req, ' req')
    console.log('\n\n=====================================================================\n\n')
    console.log(res, ' res')
    console.log('\n\n=====================================================================\n\n')

    console.log(req.query.date, ' req.query.date') // undefined
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

  app.get('/api/getTimeSeries', (req,res) => { //have not tested this one yet. will do so when/if we pay for time series
    //Get historical exchange rates for a given time period, where available, using the time series /
    //bulk download API endpoint. Please read all the details before integrating.
    //For more info: https://docs.openexchangerates.org/docs/time-series-json
    console.log(req, ' ================\n\n')

    console.log(req.query, ' REQ.QUERY API-ROUTE')
    var url = 'https://openexchangerates.org/api/time-series.json'+
    '?app_id='+api_key+ //from above
    '&start='+req.query.startDate+ //in format YYYY-MM-DD
    '&end='+req.query.endDate+ //in format YYYY-MM-DD
    '&base=USD'+ //base currency in three-letter symbols
    '&symbols='+req.query.symbols+ //other currencies in three-letter symbols, separated by commas, i.e. GBP,EUR,HKD
    '&prettyprint=1';
    request(url, function(err,response,body){
      if(err){ console.error("error downloading historical time series data");}
      else {
        res.send(response.body);
      }
    });
  });

};