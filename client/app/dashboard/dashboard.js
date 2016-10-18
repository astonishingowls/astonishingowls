angular.module('astonishingOwls.search',[])

.controller('refresh', function($scope, FXLinks, SharedVariables, keysGrabber){
  $scope.data = {};
  $scope.updated = "";
  $scope.dropdown = {};
  $scope.selectedbaseCxy = null;
  $scope.selectedforeignCxy = null;

  $scope.download = () => {
    FXLinks.getAll()
    .then((resp) => { 
      $scope.data = JSON.parse(resp.body); 
      $scope.updated = FXLinks.timeConverter($scope.data.timestamp);
      SharedVariables.setData($scope.data.quotes);
    }); //end of FXLinks.getAll() function

    FXLinks.getList()
    .then((resp) => { 
      $scope.dropdown = JSON.parse(resp.body).currencies;
    }); //end of FXLinks.getList() function

  }; // end of $scope.download() function

  $scope.setBase = () => {
    SharedVariables.setBase(keysGrabber($scope.selectedbaseCxy,$scope.dropdown));
    console.log(SharedVariables.getObject().baseCxy);
  };

  $scope.setForeign = () => {
    SharedVariables.setForeign(keysGrabber($scope.selectedforeignCxy,$scope.dropdown));
    console.log(SharedVariables.getObject().foreignCxy);
  };

}) //end of refresh controller



.controller('calculate', function($scope, FXLinks, SharedVariables,PostToDb){
  // $scope.baseCxy = "(base currency)";
  $scope.baseCxy = null;
  $scope.foreignCxy = null;
  $scope.data = {};
  $scope.amount = 0;
  $scope.result = 0;
  $scope.pictureUrl = '';
  $scope.getConversion = () => {
    $scope.baseCxy = SharedVariables.getObject().baseCxy;
    $scope.foreignCxy = SharedVariables.getObject().foreignCxy;
    $scope.data = SharedVariables.getObject().data;
    $scope.result = Math.round(FXLinks.convert($scope.baseCxy, $scope.foreignCxy, $scope.amount, $scope.data)*100)/100;
    PostToDb.postResults($scope.amount,$scope.result);
    FXLinks.getPicture()
    .then((res)=>{$scope.pictureUrl = 'https'+res.data.image_url.toString().slice(4); console.log($scope.pictureUrl); });
  };
}); //end of calculate controller