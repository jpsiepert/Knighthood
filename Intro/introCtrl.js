var app = angular.module("knighthood");

app.controller("introCtrl", function($scope, $location, knightService){
	$scope.beginGame = function(){
		$scope.knight = knightService.getKnight();
		$scope.knight.name = prompt("What are you called?");
		if(!$scope.knight.name){
			$scope.knight.name = "Wesley";
		}
		$scope.knight.hp = 100;
		knightService.updateKnight($scope.knight);
		$location.path("/forest")
	
	}

})