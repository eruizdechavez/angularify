// Angularify Module.
// You can create your own module for your application and use this one as
// an example on how to make basic wiring.

'use strict';

var angular = require('angular');

angular
  .module('angularify', [])
  .config(require('./config'))
  .directive('navBar', function () {
    return {
      restrict: 'E',
      template: require('./nav-bar.html')
    };
  });
