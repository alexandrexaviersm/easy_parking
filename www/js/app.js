// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('app',{
      url: '/app',
      templateUrl: 'templates/app.html',
      controller: 'AppCtrl'
    });
  $urlRouterProvider.otherwise('/app');
})

.controller('AppCtrl',function($scope,$http,$timeout){
  $scope.timeout = 0;
  function getVagas(){
    //192.168.0.10:8080
    $http.get('http://192.168.0.10:8080',{timeout: 3000})
     .then(function(response){
       $scope.timeout = 0;
       $scope.lostConnection = false;
       var vagas = response.data;
       $scope.vaga1 = vagas.vaga1;
       $scope.vaga2 = vagas.vaga2;
       $scope.vaga3 = vagas.vaga3;
       $scope.vaga4 = vagas.vaga4;
       $timeout(getVagas,1000);
     })
     .catch(function(response){
       $scope.timeout++;
       if($scope.timeout > 1){
         $scope.lostConnection = true;
       }
       $timeout(getVagas,1000);
     });
  }

  $scope.conf1 = {
    'border-left': true,
    'border-top': true,
    'border-right': true,
    'border-bottom': false
  }

  $scope.conf2 = {
    'border-left': true,
    'border-top': true,
    'border-right': true,
    'border-bottom': false
  }

  $scope.conf3 = {
    'border-left': true,
    'border-top': true,
    'border-right': true,
    'border-bottom': false
  }

  $scope.conf4 = {
    'border-left': true,
    'border-top': true,
    'border-right': true,
    'border-bottom': false
  }

  function message(response){
    $scope.detail = response;
    $scope.$apply();
  }

  var success = message;
  var error = message;
  getVagas();
});
