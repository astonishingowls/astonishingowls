describe('Routing', function () {
  var $route;
  beforeEach(module('astonishingOwls'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].controller).to.equal('loginController');
    expect($route.routes['/login'].templateUrl).to.equal('app/auth/login.html');
  });
});
