var app = angular.module("knighthood");

app.controller("forestCtrl", function($scope, $location, knightService){
	var steps = 0;
	$scope.knight = knightService.getKnight();
	$scope.directionSelect = true;
	$scope.stepsSelect = false;
	$scope.beggar = false;
	$scope.moblin = false;
	$scope.lost = false;
	$scope.potionConfirm = false;
	$scope.potionDeclined = false;
	$scope.moblinBattle = false;
	$scope.showDice = false;
	$scope.halfway = false;

	var checkHP = function(){
		if($scope.knight.hp < 1){
			$location.path("/defeat")
		}
	}

	checkHP();
	
	//var pack = [];
	var randomPotion = function (){
	  var num = Math.floor(Math.random()*5) +1
	  num *= Math.floor(Math.random() *2) == 1 ? 1: -1;
	  return num
	}

	var dice = function () {
    return Math.floor(Math.random() * (6) + 1);
};

	$scope.changeDirection = function(direction){
		$scope.stepsSelect = true;
		$scope.directionSelect = false;
		$scope.direction = direction;
		console.log($scope.direction);
	};

	$scope.stepsFn = function(){
		$scope.steps = parseInt($scope.steps);
		if($scope.direction === "left"){
			$scope.knight.steps += $scope.steps;
		}
		if($scope.direction === "right"){
			$scope.knight.steps -= $scope.steps;
		}
			if($scope.knight.steps < 50 && $scope.knight.steps > 0){
				$scope.beggar = true;
				$scope.stepsSelect= false;

			} else if($scope.knight.steps === 50){
				$scope.halfway = true;
				$scope.knight.potions.push(5);
			} else if($scope.knight.steps > 50) {
				$location.path("/dragon");
			} else if($scope.knight.steps < -50) {
				$scope.lost = true;
				$scope.stepsSelect = false;
				$scope.directionSelect = false;
				$scope.knight.steps += $scope.steps;
				$scope.direction = '';
			} else if($scope.knight.steps <= 0 && $scope.knight.steps >= -50){
				$scope.moblin = true;
				$scope.showDice = true;
				$scope.stepsSelect = false;
			} 
			knightService.updateKnight($scope.knight)
		}
	
		$scope.continueHalfway = function(){
			$scope.stepsSelect = false;
			$scope.directionSelect = true;
			$scope.direction = '';
			$scope.halfway = false;
		}



	$scope.potion = function(){
		if($scope.potionChoice === "yes"){
			var x = randomPotion();
			$scope.knight.potions.push(x);
			$scope.potionConfirm = true;
			knightService.updateKnight($scope.knight);
		} else {
			$scope.potionDeclined = true;
		}
	}

	$scope.continuePotion = function (){
		$scope.directionSelect = true;
		$scope.beggar = false;
		$scope.direction = '';
		$scope.potionChoice = '';
		$scope.potionConfirm = false;
		$scope.potionDeclined = false;
	}

	$scope.roll = function(){
		var x = dice();
		$scope.diceRoll = "You have rolled a " + x + "! ";
		$scope.moblinBattle = true;
		if(x % 2 === 0){
			$scope.moblinAttack = "You have defeated the Moblins!";
		
		} else {
			$scope.moblinAttack = "You have been struck! Your HP has gone down by 2";
			$scope.knight.hp -= 2;
			knightService.updateKnight($scope.knight)
		
		}
		$scope.showDice = false;
		
	}

	$scope.continueMoblin = function(){
			$scope.moblin = false;
			$scope.moblinBattle = false;
			$scope.directionSelect = true;
			$scope.direction = '';
	}

	$scope.backTrack = function(){
		$scope.direction = '';
		$scope.lost = false;
		$scope.directionSelect = true;

	}
})