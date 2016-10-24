//THIS FILE DOESN'T WORK. WE STARTED WITH THIS FILE IN TRYING TO WORK IN MODULARITY AND
//IN SYNC WITH API-ROUTER.JS, BUT IT DIDN'T WORK SO WE DE-MODULARIZED

// // var api_key = require('./api_key.js');
// var api_key = 'be114d521d8940e1b03aaed7cc810422';
// var request = require('request');

// // //Following is list of external API endpoints
// // var api_endpoints = {

// //   //Get the latest exchange rates available from the Open Exchange Rates API.
// //   //For more info: https://docs.openexchangerates.org/docs/latest-json
// //   latest: 'https://openexchangerates.org/api/latest.json?app_id='+api_key,

// //   //Get historical exchange rates for any date available from the Open Exchange Rates API.
// //   //Like latest.json, the /historical route provides a standard response object containing
// //   //all the conversion rates for all available symbols/currencies on your requested date,
// //   //labeled by their international-standard 3-letter ISO currency codes.
// //   //Historical data are End-Of-Day values, and are currently available from Jan 1st, 1999.
// //   //NOTE: DATE IS IN YYYY-MM-DD FORMAT!!, i.e. '2001-02-16'
// //   //For more info: https://docs.openexchangerates.org/docs/historical-json
// //   historical: 'https://openexchangerates.org/api/historical/'+date+'.json?app_id='+api_key,

// //   //Get a JSON list of all currency symbols available from the Open Exchange Rates API,
// //   //along with their full names, for use in your integration.
// //   //This list will always mirror the currencies available in the latest rates (given as their 3-letter codes).
// //   //For more info: https://docs.openexchangerates.org/docs/currencies-json
// //   currencies: 'https://openexchangerates.org/api/currencies.json',

// //   //Get historical exchange rates for a given time period, where available, using the time series /
// //   //bulk download API endpoint. Please read all the details before integrating.
// //   //For more info: https://docs.openexchangerates.org/docs/time-series-json
// //   timeSeries: 'https://openexchangerates.org/api/time-series.json'+
// //     '?app_id='+api_key+ //from above
// //     '&start='+startDate+ //in format YYYY-MM-DD
// //     '&end='+endDate+ //in format YYYY-MM-DD
// //     '&base='+base+ //base currency in three-letter symbols
// //     '&symbols='+symbols+ //other currencies in three-letter symbols, separated by commas, i.e. GBP,EUR,HKD
// //     '&prettyprint=1'
// // };

// //functions written out to download data from external API
// exports.getAllLatest = function(){
//   var url = 'https://openexchangerates.org/api/latest.json?app_id='+api_key;
//   request(url, function(err,response,body){
//     if(err){ console.error("error downloading data via getAllLatest");}
//     else {
//       response.body;
//     }
//   });
// };
//   // ,

//   // //date will be in 'YYYY-MM-DD' format
//   // getHistorical: function(date){
//   //   request(api_endpoints.historical, function(err,response,body){
//   //     if(err){ console.error("error downloading data via getHistorical");}
//   //     if(!err && response.statusCode == 200){
//   //       res.send(response);
//   //     }
//   //   })
//   // },

//   // getFullList: function(){
//   //   request(api_endpoints.currencies, function(err,response,body){
//   //     if(err){ console.error("error downloading full list of currencies");}
//   //     if(!err && response.statusCode == 200){
//   //       res.send(response);
//   //     }
//   //   })
//   // },

//   // //dates will be in 'YYYY-MM-DD' format. base will be written vs. USD.
//   // //symbols are comma-separated values of three-letter currencies, i.e. 'GBP,EUR,HKD'
//   // getTimeSeries: function(startDate,endDate,base,symbols){
//   //   request(api_endpoints.timeSeries, function(err,response,body){
//   //     if(err){ console.error("error downloading time series data for those currencies");}
//   //     if(!err && response.statusCode == 200){
//   //       res.send(response);
//   //     }
//   //   })
//   // }






