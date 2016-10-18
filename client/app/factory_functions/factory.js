angular.module('astonishingOwls.factory', [])
.factory('Search', function($http){

  //Get all data and pinpoint to server api call
  var getall = function(){
    return $http({
      method: 'GET',
      url: '/api/getAll'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  //Receive user input data from input field, and pass data to server api call
  var getHistorical = function(userInput){
    console.log(userInput, ' : userInput factory.js•')
    return $http({
      method: 'GET',
      url: '/api/getHistorical',
      data: userInput
    })
  }

  var getListOfCurrencies = function(){
    return $http({
      method: 'GET',
      url: '/api/getListOfCurrencies'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  //Receive user input data from input field, and pass data to server api call
  var getTimeSeries = function(userInput){
    return $http({
      method: 'GET',
      url: '/api/getTimeSeries',
      data: userInput
    })
  }

  var testingGetAll = getall();
  getall();
  return {
    getall: getall,
    getHistorical: getHistorical,
    getListOfCurrencies: getListOfCurrencies,
    getTimeSeries: getTimeSeries
  };
})

.factory('AuthService', ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            // create user variable
            var user = null;

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });

            function isLoggedIn() {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            }

            function getUserStatus() {
                return $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if (data.status) {
                            user = true;
                        } else {
                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            }

            function login(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

        }]);
