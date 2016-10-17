angular.module('astonishingOwls', [
    'astonishingOwls.factory',
    'astonishingOwls.auth',
    'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: 'app/auth/signin.html'
      });

    //Note: sprint had reference to an $httpProvider intercept
    //that was used for authentication (see note below too)
});


//Note to group: shortly sprint had references to
//$rootScope, which had a listener function triggered when
//you have a '$routeChangeStart'. This was used in context of
//authentication. Not sure if we'll need this for our
//Firebase Auth, but we can consider it
