'use strict';

var ChumifyApp = angular.module('ChumifyApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/load', {
        templateUrl: 'views/load.html',
        controller: 'LoadCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
