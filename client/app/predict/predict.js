angular.module('predict', [])

.controller('predictController', ['$scope', '$location', 'Search','formatDate','SharedVariables', function($scope, Search){

  // $scope.availableOptions = {} //this is the result of the latest.JSON API call. gets most recent rates
  // $scope.listOfCurrency = {}; //this is the result of the currencies.JSON API call
  // $scope.historyRate = {}; //this is the object that's set up to take in the result of the four API
  // //calls that are run after the search button is hit, showing today's rate, last week's rate, last mo, last yr
  // $scope.selectedCurrency = ''; //full currency name, i.e. "United States Dollar"
  // $scope.inputCurrency = ''; //it's the three letter keys, i.e. "USD"
  // $scope.passedToDB = []; //this is the array that is passed to the database
  // $scope.downloadedData = []; //this is the result of downloading data from the database
  //
  $scope.prediction = '';



    Search.getPrediction().then(function(res){
      $scope.prediction = res.outputValue;

    });




}]);
