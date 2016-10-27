//module and controller to get data from db, render it in a chart with the option to export as a .csv or .pdf

angular.module('exportChart', ['ui.grid', 'ui.grid.selection', 'ui.grid.exporter'])

.controller('exportController',function($scope, $interval, Search, uiGridExporterService) {
  //options for the ui-grid, enables export options (csv, pdf) and formats them
  //data property is what will be rendered in the chart
  $scope.options = {
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'myFile.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    data: []
  };
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
    $scope.options.data = $scope.dataPositions;
    console.log($scope.dataPositions, "++dataPositions++");
    // console.log($scope.dbData, "+++dbData+");
    //get an array of the currencies over time- their history
    for(var i = 0; i < $scope.dbData.length; i += 1) {
      console.log('$scope.dbData[i]+++', i, $scope.dbData[i].length);
      if($scope.dbData[i].length) {
        for(var z = 0; z < $scope.dbData[i].length; z += 1) {
          $scope.dataPositionHistory.push($scope.dbData[i][z]);
          // $scope.options.data.push($scope.dbData[i][z]);
            //.boughtAmount, .cxy, .date, .time
        }
      }
    }
    // console.log($scope.dataPositionHistory, "++dataPositionHistory++");
  });
});
