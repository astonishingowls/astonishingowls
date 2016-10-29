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

  it('Should have /logout route, template, and controller', function () {
    expect($route.routes['/logout']).to.be.defined;
    expect($route.routes['/logout'].controller).to.equal('logoutController');
  });

  it('Should have /dashboard oute, template, and controller', function() {
    expect($route.routes['/dashboard']).to.be.defined;
    expect($route.routes['/dashboard'].controller).to.equal('searchCurrency');
    expect($route.routes['/dashboard'].templateUrl).to.equal('app/dashboard/dashboard.html')
  });

  it('Should have an /export route, template, and controller', function () {
    expect($route.routes['/export']).to.be.defined;
    expect($route.routes['/export'].controller).to.equal('exportController');
    expect($route.routes['/export'].templateUrl).to.equal('app/export/export.html');
  });

});
