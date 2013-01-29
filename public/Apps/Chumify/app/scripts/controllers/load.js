'use strict';

ChumifyApp.controller('LoadCtrl', function($scope, game) {
	
	game.get(function(result){
			$scope.$apply(function() {
		        $scope.games = result;
		    	});
			console.log($scope.games);
		});

});
