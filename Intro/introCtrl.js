var app = angular.module("knighthood");

app.controller("introCtrl", function($scope, $location, knightService){
	$scope.enterName = false;

	$scope.beginGame = function(){
		$scope.enterName = true;
	
	}
	$scope.enterGame = function(){
		$scope.knight = knightService.getKnight();
		if(!$scope.Wesley) {
			$scope.knight.name = "Wesley";
		} else {
			$scope.knight.name = $scope.Wesley;
		}
		$scope.knight.hp = 100;
		knightService.updateKnight($scope.knight)
		$location.path("/forest")
	}

})