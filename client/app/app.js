angular.module('astonishingOwls', [
    'astonishingOwls.factory',
    'astonishingOwls.auth',
    'astonishingOwls.search',
    'chart.js',
    'exportChart',
    'ui.grid',
    'ui.grid.exporter',
    'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'searchCurrency',
          access: {restricted: true}
      })
      .when('/dashboard', {
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'searchCurrency',
          access: {restricted: true}
      })
      .when('/login', {
          templateUrl: 'app/auth/login.html',
          controller: 'loginController'
      })
      .when('/logout', {
          controller: 'logoutController',
          access: {restricted: true}
      })
      .when('/register', {
          templateUrl: 'app/auth/register.html',
          controller: 'registerController'
      })
      .when('/export', {
          templateUrl: 'app/export/export.html',
          controller: 'exportController'
      })
      .otherwise({
          redirectTo: '/'
      });

})

.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function () {
                    if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});
