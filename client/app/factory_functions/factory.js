angular.module('astonishingOwls.factory', []);

.factory('Search', function($http){


  // getall = /api/getAll "GET"

  // getHistorical = /api/getHistorical "POST", input from html date

  // getListOfCurrencies = /api/getListOfCurrencies "GET"

  //getTimeSeries = /api/getTimeSeries "POST"

  var getall = function(){
    return $http({
      method: 'GET',
      url: '/api/getAll'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

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

.factory('Auth',function ($http, $location, $window){
 //do something with Auth.

 //Sign up


 //Log in


 //Log Out
})

