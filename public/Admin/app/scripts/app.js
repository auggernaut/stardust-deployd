'use strict';

var AdminApp = angular.module('AdminApp', [])
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
        .when('/services/', {
            templateUrl: 'views/services.html',
            controller: 'ServicesCtrl'
        })
        .when('/users/', {
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl'
        })
        .when('/analytics/', {
            templateUrl: 'views/analytics.html',
            controller: 'AnalyticsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  }]);
