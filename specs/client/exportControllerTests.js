//tests for links controller
describe('LinksController', function () {
  var $scope, $rootScope, createController, Search, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('astonishingOwls'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Search = $injector.get('Search');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('exportController', {
        $scope: $scope,
        Search: Search
      });
    };

  }));
  //exports controller should have an options object for the ui-grid module
  it('should have an options object on the $scope', function () {
    createController();
    expect($scope.options).to.be.an('object');
  });

  // it('should call `Search.getDB()` when controller is loaded', function () {
  //   sinon.spy(Search, 'getDB');
  //   $httpBackend.expectGET('/database');
  //
  //   createController();
  //   $httpBackend.flush();
  //
  //   expect(Search.getDB.called).to.equal(true);
  //   Search.getDB.restore();
  // });

});
