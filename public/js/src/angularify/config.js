// Basic configuration for Angularify module.

'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Set '/' as the default route
    $urlRouterProvider.otherwise('/');

    // Add some routes to our app. For more details on how this work see
    // http://angular-ui.github.io/ui-router/
    $stateProvider
      .state('home', {
        url: '/',
        template: require('./home.html')
      })
      .state('about', {
        url: '/about',
        template: require('./about.html')
      })
      .state('contact', {
        url: '/contact',
        template: require('./contact.html')
      });
  }
];
