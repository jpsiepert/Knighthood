var app = angular.module("knighthood");

app.controller("dragonCtrl", function($scope, $location, knightService){
	$scope.dragonHP = 100;
	$scope.knight = knightService.getKnight();
	$scope.actions = true;
	$scope.hitPoints = false;
	$scope.blockDragon = false;
	$scope.drinkPotion = false;
	// var checkPotions = function(){
	// 	if($scope.knight.potions.length < 1){
	// 		$scope.knight.potions = '';
	// 	}
	// }
	// checkPotions();

	var checkHP = function(){
		if($scope.dragonHP < 1){
			$location.path("/success")
		} else if($scope.knight.hp < 1){
			$location.path("/defeat")
		}
	}
	checkHP();
	var dice = function () {
    	return Math.floor(Math.random() * (6) + 1);
	};
	$scope.fight = function(){
		$scope.hitPoints = true;
		$scope.blockDragon = false;
		$scope.drinkPotion = false;
		var a = dice();
		if(a < 5){
			$scope.hit = "You successfully hit the dragon for " + (5 + a) + " hp!"
			$scope.dragonHP -= 5 + a;
		} else {
			$scope.hit = "You missed! The dragon attacked. Loss of " + (2 + a) + " hp"
			$scope.knight.hp -= 2 + a;
		}
		knightService.updateKnight($scope.knight)
		checkHP();
	};


	$scope.block = function(){
		$scope.hitPoints = false;
		$scope.drinkPotion = false;
		$scope.blockDragon = true;
		var b = dice();
		if(b < 4){
			$scope.blocked = "You blocked succesfully!";
		} else {
			$scope.blocked = "Your shield didn't quite cover you, loss of 2 hp";
			$scope.knight.hp -= 2; 
		}
		checkHP();
	}

	$scope.potion = function(){
		$scope.hitPoints = false;
		$scope.blockDragon = false;
		$scope.drinkPotion = true;
		var c = $scope.knight.potions.shift();
		if(c < 0){
			$scope.potionResult = "Curses!, potion took away " + Math.abs(c) + " hp!";
		} else {
			$scope.potionResult = "Such Kindness, potion gave " + c + " hp!";
		}
		$scope.knight.hp += c;

		knightService.updateKnight($scope.knight)
		//checkPotions();
	};

	$scope.run = function(){
		$scope.knight.hp -= 5;
		knightService.updateKnight($scope.knight)
		$location.path("/forest");
	}
})