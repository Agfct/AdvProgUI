'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.cqView',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/cqView'});
}]).directive('capitalize', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          var capitalize = function(inputValue) {
            if(inputValue == undefined) inputValue = '';
            var capitalized = inputValue.toUpperCase();
            if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }
            return capitalized;
          }
          modelCtrl.$parsers.push(capitalize);
          capitalize(scope[attrs.ngModel]);  // capitalize initial value
        }
      };
    });
