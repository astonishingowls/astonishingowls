angular.module('astonishingOwls.factory', [])


.factory('Search', function($http){


  //DATABASE GET AND POST REQUESTS
  var getDB = function(){
    return $http({
      method: 'GET',
      url: '/database'
    })
    .then(function (resp) {
      return resp;
    });
  };

  var postDB = function(data){
    return $http({
      method: 'POST',
      url: '/database',
      data: data
    })
    .then(function (resp) {
    });
  };

  //END OF DATABASE GET AND POST REQUEST


  //Get all data and pinpoint to server api call  /latest.json
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
  var getHistorical = function(date){
    return $http({
      method: 'GET',
      url: '/api/getHistorical',
      params: {date:date}
    })
  }

  //Receive all currency available from server api call
  var getListOfCurrencies = function(){
    return $http({
      method: 'GET',
      url: '/api/getListOfCurrencies'
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  return {
    getall: getall,
    getHistorical: getHistorical,
    getListOfCurrencies: getListOfCurrencies,
    postDB: postDB,
    getDB: getDB
  };
}) // End of Search factory



.factory('AuthService', ['$q', '$timeout', '$http',
function ($q, $timeout, $http) {

  // create user variable
  var user = null;

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

  // return available functions for use in the controllers
  return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
  });

}]) // End of AuthService factory

//keysGrabber grabs key as value from object
//This is relevant in the ng-options select window we designed 
//in the New Search fields
.factory('keysGrabber',function(){
 return function(value, object){
   for(var key in object){
     if(object[key] == value){
       return key;
     }
   }
   return null;
 }
}) //end of keysGrabber


.factory('formatDate',function(){
  //format date to YYYY-MM-DD
  return function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}) //end of formatDate

//This is a shared service that was written to share data
//between the two different controllers
.factory('SharedVariables', function(){
  var downloadedData = [];
  return {
    setDownloadedData: function(value) {
      downloadedData = value;
    },
    getData: function(){
      return downloadedData;
    }
  }
}) //end of SharedVariables factory
