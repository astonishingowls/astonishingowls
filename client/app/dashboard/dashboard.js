angular.module('astonishingOwls.search', [])


.controller('searchCurrency',
['$scope', '$location', 'Search','keysGrabber','formatDate','SharedVariables',
function($scope, $location, Search, keysGrabber, formatDate, SharedVariables){

  $scope.availableOptions = {}
  $scope.listOfCurrency = {};
  $scope.historyRate = {};
  $scope.selectedCurrency = ''; //it's the full currency name
  $scope.inputCurrency = ''; //it's the three letter keys
  $scope.passedToDB = [];
  $scope.downloadedData = [];
  $scope.boughtAmount;

  $scope.refreshView = function(){
    //get keys for selected currency in dropdown list
    $scope.inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency);
    //re-initialize historyRate views
    $scope.historyRate = {};
  }

  $scope.getSelectedCurrency = function(){

    var today = formatDate(new Date(new Date().setDate(new Date().getDate())));
    var sevenDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));
    var thirtyDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    var yearAgo = formatDate(new Date(new Date().setDate(new Date().getDate() - 365)));

    Search.getall().then(function(res){
      var inputCurrency = keysGrabber($scope.selectedCurrency, $scope.listOfCurrency)
      $scope.historyRate.todayRate = res.rates[inputCurrency];
      $scope.passedToDB.push({
        time: "today",
        cxy: inputCurrency,
        date: today,
        value: $scope.historyRate.todayRate
      });
      console.log("today pushed")
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
      console.log("last week pushed")
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
      console.log("last month pushed")
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
      console.log("last year pushed")
      $scope.historyRate.ratesLoaded = true;
      $scope.historyRate.buttonShow = true;
      })
    })

  } //end of .getSelectedCurrency function


  $scope.postToDB = function(){
    if($scope.passedToDB.length === 4){
      console.log("passed to DB",$scope.passedToDB)
      $scope.passedToDB[0].boughtAmount = $scope.boughtAmount;
      Search.postDB($scope.passedToDB)
      .then( () => {//Sara, I promisified this because I think there was an async issue
        Search.getDB()
        .then( (resp) => {
          $scope.downloadedData = resp.data.savedSearch;
          SharedVariables.setDownloadedData($scope.downloadedData);
          console.log("line 87 ++++++++",SharedVariables.getData());
        });
      });
      $scope.passedToDB = [];

    } else {
      $scope.passedToDB = [];
      console.log("Please add something!")
    }
  }; //end of .postToDB function



  // //we don't use this yet.... this will be for historical trend analysis
  // $scope.submitHistoricDate = function(){
  //   var getHistoricalInput = $scope.getHistoricalDate;
  //   Search.getHistorical(getHistoricalInput)
  //   .then(function(res){
  //   })
  // }

  // //we don't use this yet.... this will be for historical trend analysis
  // $scope.getTimeSeries = function(){
  //   var userInput = {};
  //   userInput.startDates = $scope.timeSeriesStart
  //   userInput.endDates = $scope.timeSeriesEnd
  //   userInput.symbols = $scope.timeSeriesSymbol

  //   Search.getTimeSeries(userInput)
  //   .then(function(res){
  //   })
  // }


  //Initializin getall function when page is loaded.
  Search.getall().then(function(res){
    $scope.availableOptions.rates = res.rates;
  })


  //Initializing to get all list of currencies
  Search.getListOfCurrencies().then(function(res){
    $scope.listOfCurrency = res
  })

}])


.controller('dashboardView',function($scope, $interval, Search, SharedVariables){
  $scope.downloadedData = SharedVariables.getData();
  $scope.manipulateData = [];
  $scope.initializing = true;

  //for bar charts
  $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
  $scope.labels = []; //labels for x axis
  $scope.series = ['Purchased','Market Value', 'Gain/Loss']; //data being downloaded, i.e. bought, current, gain/loss
  $scope.costBasis = [];
  $scope.marketValues = [];
  $scope.gainLoss = [];
  $scope.data = []; //array of array for each series
  // console.log($scope.data, ' LINE 158')
  $scope.datasetOverride = [
    {
      yAxisID: 'y-axis-1',
      // label: "Bar chart",
      borderWidth: 1,
      type: 'bar'
    },
    {
      yAxisID: 'y-axis-1',
      // label: "Bar chart",
      borderWidth: 1,
      type: 'bar'
    },
    {
      yAxisID: 'y-axis-2',
      // label: "Line chart",
      borderWidth: 3,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      type: 'line'
    }
  ];
  $scope.options = {
    legend: {display: true},
    title: {
            display: true,
            text: 'Current Holding'
        },
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
            beginAtZero: true
          },
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
  $scope.optionsPie = {
    title: {
            display: true,
            text: 'Portfolio Summary'
        },
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
          // console.log(tooltipItem , ' tooltipItem+++');
          // console.log(dataset , ' dataset+++');
          // console.log(data , ' data+++');
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
  //end of bar chart variables



  $scope.update = function(){
    //reinitialize charts data
    $scope.labels = []; //repopulated after Search.getDB is called
    $scope.costBasis = []; //repopulated after Search.getDB is called
    $scope.marketValues = [];
    $scope.gainLoss = [];
    $scope.data = [];
    $scope.ngIfShowData = true; //On click, change to true for ng-if to show data
    $scope.objectOfSavedCXY = {}
    $scope.totalBought = 0;
    console.log( $scope.objectOfSavedCXY, '$scope.objectOfSavedCXY')

    //set up "initializing" conditions, where if "initializing" is true:
    if($scope.initializing){
      //you have to download the data directly from the database
      Search.getDB()
      .then( (resp) => {
        console.log("response???? 141",resp);
        $scope.downloadedData = resp.data.savedSearch;
        SharedVariables.setDownloadedData($scope.downloadedData);
        for (var i = 0; i < $scope.downloadedData.length; i++){ //populates $scope.manipulateData
          $scope.manipulateData.push($scope.downloadedData[i][0])
        }
        console.log($scope.manipulateData);

      });
      $scope.initializing = false;
    } else {
      //else you download the data from the updated results from the search bar through the shared factory
      $scope.downloadedData = SharedVariables.getData();
      console.log("line 153++++++++",$scope.manipulateData);
      console.log("line 154++++++++",SharedVariables.getData());
      $scope.manipulateData = [];
      for (var i = 0; i < $scope.downloadedData.length; i++){
        $scope.manipulateData.push($scope.downloadedData[i][0])
      }
      console.log($scope.manipulateData);
    }

    //After data is downloaded from the database,
    //Following code takes all user's saved currencies and downloads current values
    //for "cost vs. purchased" comparison
    //The "refreshed" values are set to a .refreshed property for each item in manipulateData
    Search.getall().then( (res) => {
      console.log("res.rates????",res.rates);
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
        console.log("currencies",$scope.labels);
        console.log("COST BASIS ",$scope.costBasis);
        console.log("market values ",$scope.marketValues);
      }
      for(var k = 0; k < $scope.labels.length; k++){
        $scope.gainLoss.push( $scope.marketValues[k] - $scope.costBasis[k]); //populate gainLoss for charts

       //Creates Object of currency on update for charts
        $scope.objectOfSavedCXY[$scope.labels[k]] = $scope.marketValues[k];
        $scope.totalBought += $scope.marketValues[k];
      }
      $scope.data.push($scope.costBasis); //for charts
      $scope.data.push($scope.marketValues); //for charts
      $scope.data.push($scope.gainLoss); //for charts
      console.log($scope.data);

    });

  } //end of $scope.update




}) //end of dashboardView

.controller('charts',function(){})