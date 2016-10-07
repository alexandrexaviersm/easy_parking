(function(){
angular.module('starter')
.directive('uiParking',uiParkingDirective);

function uiParkingDirective(){
  return {
    link: function(scope,elem,attrs,ctrl){
      var w = angular.element(window);

      var initConf = {
        'border-left-width': '3px',
        'border-top-width': '3px',
        'border-right-width': '3px',
        'border-bottom-width': '3px'
      }

      var left = Number(scope.conf.uiL);
      var top = Number(scope.conf.uiT);
      var height = Number(scope.conf.uiH) || 20;
      var width = Number(scope.conf.uiW) || 20;

      angular.forEach(scope.conf,function(obj,index){
        initConf[index] = (obj)?initConf[index]:'';
      });

      elem.css(initConf);

      ctrl.register(elem,left,top,height,width);

      w.bind('resize', function(){;
        ctrl.register(elem,left,top,height,width);
        scope.$apply();
      });
    },
    scope: {
      conf: '='
    },
    require: '^^divParking'
  }
}

})();

(function() {
    'use strict';

    angular
        .module('starter')
        .directive('divParking', divParking);

    /* @ngInject */
    function divParking() {
        var directive = {
            restrict: 'A',
            controller: Controller
        };

        return directive;
    }

    Controller.$inject = ['$scope','$timeout','$element'];

    /* @ngInject */
    function Controller($scope,$timeout,$element) {
        var vm = this;

        vm.register = register;

        function register(elem,left,top,height,width){
          var offsetTop    = Number($element[0].offsetTop);
          var offsetLeft   = Number($element[0].offsetLeft);
          var offsetWidth  = Number($element[0].offsetWidth);
          var offsetHeight = Number($element[0].offsetHeight);


          var moreLeft  = offsetWidth  * left / 100;
          var moreTop   = offsetHeight * top / 100;
          var newWidth  = offsetWidth  * width / 100 + 2;
          var newHeight = offsetHeight * height / 100 + 2;

          elem.css({
            left: offsetLeft + moreLeft + 'px',
            top: offsetTop + moreTop + 'px',
            width: newWidth + 'px',
            height: newHeight + 'px',
            'line-height': newHeight + 'px'
          });
        }
    }
})();
