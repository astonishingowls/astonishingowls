//tests the factory for required functions
describe('Factory', function () {
  beforeEach(module('astonishingOwls.factory'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


describe('Search Factory', function () {
    var Search;

    beforeEach(inject(function (_Search_) {
      Search = _Search_;
    }));

    it('should exist', function () {
      expect(Search).to.exist;
    });

    it('should have a method `getDB`', function () {
      expect(Search.getDB).to.be.a('function');
    });

    it('should have a method `postDB`', function () {
      expect(Search.postDB).to.be.a('function');
    });

  });

});
