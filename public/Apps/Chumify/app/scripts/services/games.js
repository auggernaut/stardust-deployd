'use strict';

ChumifyApp.factory('games', function() {
  // Service logic
  var games = {};


  // Public API here
  return {
    get: function(callback) {
	      dpd.games.get(function (result, err) {
	    		if (err) return console.log(err);
	        callback(result);  
	      });
	    }	
  };
});
