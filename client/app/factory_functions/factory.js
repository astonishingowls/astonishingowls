angular.module('astonishingOwls.factory', [])

.factory('Search', function($http){

  //Get all data and pinpoint to server api call
  var getall = function(){
    return $http({
      method: 'GET',
      url: '/api/getAll'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  //Receive user input data from input field, and pass data to server api call
  var getHistorical = function(userInput){
    return $http({
      method: 'POST',
      url: '/api/getHistorical',
      data: userInput
    })
  }

  var getListOfCurrencies = function(){
    return $http({
      method: 'GET',
      url: '/api/getListOfCurrencies'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  //Receive user input data from input field, and pass data to server api call
  var getTimeSeries = function(userInput){
    return $http({
      method: 'POST',
      url: '/api/getTimeSeries',
      data: userInput
    })
  }

  return {
    getall: getall,
    getHistorical: getHistorical,
    getListOfCurrencies: getListOfCurrencies,
    getTimeSeries: getTimeSeries
  };
})

// .factory('Auth',function ($http, $location, $window){
//  //do something with Auth.

//  //Sign up


//  //Log in


//  //Log Out
// })

