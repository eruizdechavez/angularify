// This is your application entry point.
'use strict';

var domready = require('domready'),
  angular = require('angular');

// Require your application code as a module here. Angularify module is just an
// example.
require('./angularify/angularify');

domready(function () {
  // We have added some basic (but great) libraries for you:
  // - Angular UI Bootstrap: Twitter's Bootstrap JS code, jQuery free.
  //   http://angular-ui.github.io/bootstrap/
  // - Angular UI Router: A better router for Angular which provides not only
  //   routes but also states and nested routes.
  //   http://angular-ui.github.io/ui-router/
  angular
    .module('app', [
      'ui.bootstrap',
      'ui.router',
      'angularify'
    ]);

  angular.bootstrap(document, ['app']);
});
