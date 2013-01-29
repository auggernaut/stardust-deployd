'use strict';

UserApp.controller('NavCtrl', function ($scope) {
    var items = {};
    items[0] = { text: "Home", link: "#/" };
    items[1] = { text: "Apps", link: "#/apps" };
    items[2] = { text: "Data", link: "#/data" };
    items[3] = { text: "Support", link: "#/support" };

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

UserApp.controller('HomeCtrl', function ($scope, $rootScope) {

    dpd.users.me(function (result, error) {
        if (!result)
            window.location.replace("/index.html");
        $scope.user = result;
        $rootScope.$apply();
    });


});


UserApp.controller('AppsCtrl', function ($scope, $rootScope) {

    dpd.apps.get(function (result, error) {
        $scope.installed = result;
        $rootScope.$apply();
    });
});

UserApp.controller('DataCtrl', function ($scope, $rootScope) {


});


UserApp.controller('SupportCtrl', function ($scope, $rootScope) {

});

