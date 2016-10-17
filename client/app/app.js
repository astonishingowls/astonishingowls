angular.module('astonishingOwls', [
    'astonishingOwls.factory',
    'astonishingOwls.auth',
    'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'app/auth/home.html',
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
      .otherwise({
          redirectTo: '/'
      });

    //Note: sprint had reference to an $httpProvider intercept
    //that was used for authentication (see note below too)
})


//Note to group: shortly sprint had references to
//$rootScope, which had a listener function triggered when
//you have a '$routeChangeStart'. This was used in context of
//authentication. Not sure if we'll need this for our
//Firebase Auth, but we can consider it
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
