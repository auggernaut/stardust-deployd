'use strict';

var UserApp = angular.module('UserApp', [])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/apps/', {
            templateUrl: 'views/apps.html',
            controller: 'AppsCtrl'
        })
        .when('/data/', {
            templateUrl: 'views/data.html',
            controller: 'DataCtrl'
        })
        .when('/support/', {
            templateUrl: 'views/support.html',
            controller: 'SupportCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  }]);
