var app = angular.module("knighthood");

app.factory("knightService", function(){
	var _knight = {name: "Wesley", hp: 100, potions: [], steps: 0};
	return {
		getKnight: function(){
			return _knight;
		},

		updateKnight: function(knight){
			_knight = knight;

		}
	}
})