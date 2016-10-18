angular.module('astonishingOwls.search', [])
.controller('searchCurrency', ['$scope', '$location', 'Search',
    function($scope, $location, Search){

      $scope.availableOptions = {}
      $scope.listOfCurrency = {};

      $scope.submitHistoricDate = function(){
        var getHistoricalInput = $scope.getHistoricalDate;
        console.log(getHistoricalInput, ' get Historical Input');
        console.log(typeof getHistoricalInput);

        Search.getHistorical(getHistoricalInput)
        .then(function(res){
          console.log(res.rates)

        })
      }


      $scope.getTimeSeries = function(){
        var userInput = {};
        userInput.startDates = $scope.timeSeriesStart
        userInput.endDates = $scope.timeSeriesEnd
        userInput.symbols = $scope.timeSeriesSymbol

        Search.getTimeSeries(userInput)
        .then(function(res){
          console.log(res)
        })
      }



      //Initializin getall function when page is loaded.
      Search.getall().then(function(res){
          console.log(res.rates, ' GETALL Initialize')
          $scope.availableOptions.rates = res.rates;
        })

    }])