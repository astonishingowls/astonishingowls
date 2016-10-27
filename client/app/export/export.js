//module and controller to get data from db, render it in a chart with the option to export as a .csv or .pdf

angular.module('exportChart', [])

.controller('exportController',function($scope, $interval, Search) {
  //Search contains getDB to get user data from the db
  Search.getDB()
  .then( (resp) => {
    //resp is an aray of arrays with objects, dataPositionHistory will be an array of a position from today, week, and yearAgo, dataPositions will be an array of the currently held positions at today's value
    $scope.dbData = resp.data.savedSearch;
    $scope.dataPositionHistory = [];
    $scope.dataPositions = [];
    //variable for number of columns for creating an exportable chart
    var columns = $scope.dbData.length;

    //reformat dbData:
    for(var a = 0; a < $scope.dbData.length; a += 1) {
      $scope.dataPositions.push($scope.dbData[a][0]);
    }
    console.log($scope.dataPositions, "++dataPositions++");
    console.log($scope.dbData, "+++dbData+");
    //get an array of the currencies over time- their history
    for(var i = 0; i < $scope.dbData.length; i += 1) {
      console.log('$scope.dbData[i]+++', i, $scope.dbData[i].length);
      if($scope.dbData[i].length) {
        for(var z = 0; z < $scope.dbData[i].length; z += 1) {
          $scope.dataPositionHistory.push($scope.dbData[i][z]);
            //.boughtAmount, .cxy, .date, .time
        }
      }
    }
    console.log($scope.dataPositionHistory, "++dataPositionHistory++");
  });
});
