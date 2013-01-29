'use strict';

AdminApp.controller('NavCtrl', function ($scope) {
    var items = {};
    items[0] = { text: "Home", link: "#/" };
    items[1] = { text: "Apps", link: "#/apps" };
    items[2] = { text: "Data", link: "#/data" };
    items[3] = { text: "Services", link: "#/services" };
    items[4] = { text: "Users", link: "#/users" };
    items[5] = { text: "Analytics", link: "#/analytics" };

    $scope.items = items;
    $scope.selected = $scope.items[0];

    $scope.select = function (item) {
        $scope.selected = item;
    };

    $scope.logout = function (item) {
        dpd.users.logout(function (result, error) {
            window.location.replace("/index.html");
        });
    };
});

AdminApp.controller('HomeCtrl', function ($scope, $rootScope) {

    dpd.users.me(function (result, error) {
        if (!result)
            window.location.replace("/index.html");
        $scope.user = result;
        $rootScope.$apply();
    });

});


AdminApp.controller('AppsCtrl', function ($scope, $rootScope) {

    dpd.apps.get(function (result, error) {
        $scope.installed = result;
        $rootScope.$apply();
    });
});

AdminApp.controller('DataCtrl', function ($scope, $rootScope) {


});


AdminApp.controller('ServicesCtrl', function ($scope, $rootScope) {

});



AdminApp.controller('UsersCtrl', function ($scope, $rootScope) {

});


AdminApp.controller('AnalyticsCtrl', function ($scope, $rootScope) {

});
