//There are two controllers in this file, and these are the two that
//make up the page. There is a "searchCurrency" controller and 
//also a "dashboardView" controller
angular.module('astonishingOwls.search', [])

//This controller is the search box
.controller('searchCurrency',
['$scope', '$location', 'Search','keysGrabber','formatDate','SharedVariables',
function($scope, $location, Search, keysGrabber, formatDate, SharedVariables){

  $scope.availableOptions = {} //this is the result of the latest.JSON API call. gets most recent rates
  $scope.listOfCurrency = {}; //this is the result of the currencies.JSON API call
  $scope.historyRate = {}; //this is the object that's set up to take in the result of the four API 
  //calls that are run after the search button is hit, showing today's rate, last week's rate, last mo, last yr
  $scope.selectedCurrency = ''; //full currency name, i.e. "United States Dollar"
  $scope.inputCurrency = ''; //it's the three letter keys, i.e. "USD"
  $scope.passedToDB = []; //this is the array that is passed to the database 
  $scope.downloadedData = []; //this is the result of downloading data from the database
  $scope.boughtAmount; //this captures what the user inputs into the "amount" in the search field

  //When user selects currency from list, ng-change calls refreshView and getSelectedCurrency
  //refreshView shows user which currency is selected in country, symbol format
  $scope.refreshView = function(){
    //get keys for selected currency in dropdown list
    $scope.inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency);
    //re-initialize historyRate views
    $scope.historyRate = {};
  }

    //getSelectedCurrency calls getHistorical function in factory. Calls four different date data point, today, 7 days, 30 days, and 365 days to receive each date currency data.
  $scope.getSelectedCurrency = function(){

    //uses formatDate function from factory to convert date into  YYYY-MM-DD format.
    var today = formatDate(new Date(new Date().setDate(new Date().getDate())));
    var sevenDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));
    var thirtyDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    var yearAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 365)));

    //getall function pushes new data(four different date data) from user and pushes to 
    //passedToDB variable, in preparation for when that passedToDB variable is ultimately
    //pushed to the database.
    Search.getall().then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.todayRate = res.rates[inputCurrency];
      $scope.passedToDB.push({
        time: "today",
        cxy: inputCurrency,
        date: today,
        value: $scope.historyRate.todayRate
      });
    })
    .then( () => {
      Search.getHistorical(sevenDaysAgo).then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.sevenDaysAgo = res.data.rates[inputCurrency];
      $scope.passedToDB.push({
        time: "last week",
        cxy: inputCurrency,
        date: sevenDaysAgo,
        value: $scope.historyRate.sevenDaysAgo
      });
     })
    })
    .then( () => {
      Search.getHistorical(thirtyDaysAgo).then(function(res){
        var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
        $scope.historyRate.thirtyDaysAgo = res.data.rates[inputCurrency];
        $scope.passedToDB.push({
          time: "last month",
          cxy: inputCurrency,
          date: thirtyDaysAgo,
          value: $scope.historyRate.thirtyDaysAgo
        });
      })
    })
    .then( () => {
      Search.getHistorical(yearAgo).then(function(res){
        var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
        $scope.historyRate.yearAgo = res.data.rates[inputCurrency];
        $scope.passedToDB.push({
          time: "last year",
          cxy: inputCurrency,
          date: yearAgo,
          value: $scope.historyRate.yearAgo
        });
      $scope.historyRate.ratesLoaded = true;
      $scope.historyRate.buttonShow = true;
      })
    })

  } //end of .getSelectedCurrency function

  //this function posts the passedToDB array to the database
  $scope.postToDB = function(){
    if($scope.passedToDB.length === 4){
      $scope.passedToDB[0].boughtAmount = $scope.boughtAmount;
      Search.postDB($scope.passedToDB)
      .then( () => {
        Search.getDB()
        .then( (resp) => {
          $scope.downloadedData = resp.data.savedSearch;
          SharedVariables.setDownloadedData($scope.downloadedData);
        });
      });
      $scope.passedToDB = [];

    } else {
      $scope.passedToDB = [];
      console.log("Please add something!")
    }
  }; //end of .postToDB function

  //Initializing getall function when page is loaded.
  Search.getall().then(function(res){
    $scope.availableOptions.rates = res.rates;
  })

  //Initializing to get all list of currencies
  Search.getListOfCurrencies().then(function(res){
    $scope.listOfCurrency = res
  })

}])

//This controller will render the user's actual dashboard
.controller('dashboardView',function($scope, $interval, Search, SharedVariables){
  $scope.downloadedData = SharedVariables.getData(); //gets data from the shared service
  $scope.manipulateData = []; //data to be rendered to the site
  $scope.initializing = true; //toggle set up to dictate what is rendered when user first presses the update button

  //for AngularCharts
  $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72' ];
  $scope.labels = []; //labels for x axis
  $scope.series = ['Purchased','Market Value', 'Gain/Loss']; //data being downloaded, i.e. bought, current, gain/loss
  $scope.costBasis = [];
  $scope.marketValues = [];
  $scope.gainLoss = [];
  $scope.data = []; //array of array for each series
  $scope.datasetOverride = [
    {
      yAxisID: 'y-axis-1',
      borderWidth: 1,
      type: 'bar'
    },
    {
      yAxisID: 'y-axis-1',
      borderWidth: 1,
      type: 'bar'
    },
    {
      yAxisID: 'y-axis-2',
      borderWidth: 3,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      type: 'line'
    }
  ];
  $scope.options = {
    legend: {display: true},
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              if(parseInt(value) > 1000){
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return '$' + value.toFixed(3);
              }
            }
          },
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
                return  (value*100).toFixed(2) + '%';
            }
          },
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
  $scope.optionsPie = {
    legend: {
              display: true,
              position: 'top',
              labels:{
                fontSize:14
               }
            },
    showAllTooltips: true,
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percent = Math.floor(((currentValue/total) * 100)+0.5);
          var label = data.labels[tooltipItem.index];
          return label + ' : ' +percent + "%";
        }
      }
    },
    tooltipEvents: [],
    showTooltips: true,
    showAllTooltips: true,
    tooltipCaretSize: 0,
    onAnimationComplete: function () {
        this.showTooltip(this.segments, true);
    }
  };
  //end of chart variables

  $scope.update = function(){
    //reinitialize charts data
    $scope.labels = []; 
    $scope.costBasis = []; 
    $scope.marketValues = [];
    $scope.gainLoss = [];
    $scope.data = [];
    $scope.ngIfShowData = true; //On click, change to true for ng-if to show data
    $scope.objectOfSavedCXY = {}
    $scope.totalBought = 0;

    //set up "initializing" conditions, where if "initializing" is true:
    if($scope.initializing){
      //you have to download the data directly from the database
      Search.getDB()
      .then( (resp) => {
        $scope.downloadedData = resp.data.savedSearch;
        SharedVariables.setDownloadedData($scope.downloadedData);
        for (var i = 0; i < $scope.downloadedData.length; i++){ //populates $scope.manipulateData
          $scope.manipulateData.push($scope.downloadedData[i][0])
        }
      });
      $scope.initializing = false;
    } else {
      //else you download the data from the updated results from the search bar through the shared factory
      $scope.downloadedData = SharedVariables.getData();
      $scope.manipulateData = [];
      for (var i = 0; i < $scope.downloadedData.length; i++){
        $scope.manipulateData.push($scope.downloadedData[i][0])
      }
    }

    //After data is downloaded from the database,
    //Following code takes all user's saved currencies and downloads current values
    //for "cost vs. purchased" comparison
    //The "refreshed" values are set to a .refreshed property for each item in manipulateData
    Search.getall().then( (res) => {
      for(var i = 0; i < $scope.manipulateData.length; i++){
        var cxySearch = $scope.manipulateData[i].cxy;
        $scope.manipulateData[i].refreshed = res.rates[cxySearch];
        $scope.labels.push($scope.manipulateData[i].cxy); //populate labels array for charts
        $scope.costBasis.push($scope.manipulateData[i].boughtAmount); //populate cost basis for charts
        $scope.marketValues.push( //populate market value for charts. this is amount * current rate / purchaes rate
          Math.round(
          $scope.manipulateData[i].boughtAmount
          * $scope.manipulateData[i].refreshed
          / $scope.manipulateData[i].value, 2)
        );
      }
      for(var k = 0; k < $scope.labels.length; k++){
        $scope.gainLoss.push( $scope.marketValues[k] / $scope.costBasis[k] - 1); //populate gainLoss for charts

       //Creates Object of currency on update for charts
        $scope.objectOfSavedCXY[$scope.labels[k]] = $scope.marketValues[k];
        $scope.totalBought += $scope.marketValues[k];
      }
      $scope.data.push($scope.costBasis); //for charts
      $scope.data.push($scope.marketValues); //for charts
      $scope.data.push($scope.gainLoss); //for charts
    });

  } //end of $scope.update


}) //end of dashboardView