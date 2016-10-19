angular.module('astonishingOwls.search', [])


.controller('searchCurrency', 
['$scope', '$location', 'Search','keysGrabber','formatDate',
function($scope, $location, Search, keysGrabber,formatDate){

  $scope.availableOptions = {}
  $scope.listOfCurrency = {};
  $scope.historyRate = {};
  $scope.selectedCurrency = '';

  $scope.getSelectedCurrency = function(){

    var sevenDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    var thirtyDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    var yearAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 365)));

    Search.getall().then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.todayRate = res.rates[inputCurrency];
    })

    Search.getHistorical(sevenDaysAgo).then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.sevenDaysAgo = res.data.rates[inputCurrency];
    })

    Search.getHistorical(thirtyDaysAgo).then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.thirtyDaysAgo = res.data.rates[inputCurrency];
    })

    Search.getHistorical(yearAgo).then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.yearAgo = res.data.rates[inputCurrency];
    })

  }

  //we don't use this yet.... this will be for historical trend analysis
  $scope.submitHistoricDate = function(){
    var getHistoricalInput = $scope.getHistoricalDate;
    Search.getHistorical(getHistoricalInput)
    .then(function(res){
    })
  }

  //we don't use this yet.... this will be for historical trend analysis
  $scope.getTimeSeries = function(){
    var userInput = {};
    userInput.startDates = $scope.timeSeriesStart
    userInput.endDates = $scope.timeSeriesEnd
    userInput.symbols = $scope.timeSeriesSymbol

    Search.getTimeSeries(userInput)
    .then(function(res){
    })
  }


  //Initializin getall function when page is loaded.
  Search.getall().then(function(res){
    // console.log(res.rates, ' GETALL Initialize')
    $scope.availableOptions.rates = res.rates;
  })


  //Initializing to get all list of currencies
  Search.getListOfCurrencies().then(function(res){
    // console.log(res , ' getListOfCurrencies')
    $scope.listOfCurrency = res
  })

}])



.factory('formatDate',function(){
  //format date to YYYY-MM-DD
  return function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}); //end of keysGrabber

