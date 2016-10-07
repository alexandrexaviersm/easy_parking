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
      controller: 'AppCtrl',
      controllerAs: '$ctrl'
    });
  $urlRouterProvider.otherwise('/app');
})

.controller('AppCtrl',function($http,$timeout){
  var _timeout = 0, vm = this;
  function getVagas(){
    //192.168.0.10:8080
    $http.get('http://192.168.0.10:8080',{timeout: 3000})
      .then(function(response){
        var setorA = 0;
        var setorB = 0;
        _timeout = 0;
        vm.lostConnection = false;
        var vagas = response.data;
        if(vagas.vaga1 === true){
          setorA++;
        }
        if(vagas.vaga2 === true){
          setorA++; 
        }
        if(vagas.vaga3 === true){
          setorB++;
        }
        if(vagas.vaga4 === true){
          setorB++;
        }
        vm.vaga1 = vagas.vaga1;
        vm.vaga2 = vagas.vaga2;
        vm.vaga3 = vagas.vaga3;
        vm.vaga4 = vagas.vaga4;
        vm.setorA = setorA;
        vm.setorB = setorB;
        $timeout(getVagas,1000);
      })
      .catch(function(response){
        _timeout++;
        if(_timeout > 1){
          vm.lostConnection = true;
        }
        $timeout(getVagas,1000);
      });
  }

  function Conf(left,top,right,bottom,uiT,uiL,uiW,uiH){
    return {
      'border-left-width': left,
      'border-top-width': top,
      'border-right-width': right,
      'border-bottom-width': bottom,
      'uiT': uiT,
      'uiL': uiL,
      'uiW': uiW,
      'uiH': uiH
    }
  }

  vm.confA1 = new Conf(true,true,true,false,10,10,15,30);
  vm.confA2 = new Conf(true,true,true,false,10,25,15,30);
  vm.confB1 = new Conf(true,true,true,false,10,60,15,30);
  vm.confB2 = new Conf(true,true,true,false,10,75,15,30);

  vm.labelA = new Conf(false,false,false,false,40,10,30,5);
  vm.labelB = new Conf(false,false,false,false,40,60,30,5);

  getVagas();
});
