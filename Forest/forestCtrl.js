var app = angular.module("knighthood");

app.controller("forestCtrl", function($scope, $location, knightService){
	var steps = 0;
	$scope.knight = knightService.getKnight();
	$scope.directionSelect = true;
	$scope.stepsSelect = false;
	$scope.beggar = false;
	$scope.moblin = false;
	$scope.lost = false;


	var checkHP = function(){
		if($scope.knight.hp < 1){
			$location.path("/defeat")
		}
	}

	checkHP();
	
	var pack = [];
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
		//debugger;
		if($scope.direction === "left"){
			$scope.knight.steps += $scope.steps;
			console.log($scope.knight.steps);
			if($scope.knight.steps < 50 && $scope.knight.steps > 0){
				$scope.beggar = true;
				$scope.stepsSelect= false;

			} else if($scope.knight.steps  === 50){
				alert("You are exactly half way there! Take a +5 potion!");
				$scope.knight.potions.push(5);
				$scope.stepsSelect = false;
				$scope.directionSelect = true;
				$scope.direction = '';
				knightService.updateKnight($scope.knight)
			} else if($scope.knight.steps > 50) {
				$location.path("/dragon");
			} else {
				alert("You need to keep going left to get out of the pit of despair!");
				$scope.stepsSelect = false;
				$scope.directionSelect = true;
				$scope.knight.steps += $scope.steps;
				$scope.direction = '';
			} 
		}else {
			$scope.knight.steps -= $scope.steps;
			console.log($scope.knight.steps);
			if($scope.knight.steps <= 0 && $scope.knight.steps >= -50){
				$scope.moblin = true;
				$scope.stepsSelect = false;

			} else {
				alert("You've entered the pit of despair! Watch out for the ROUS")
				$scope.lost = true;
				$scope.stepsSelect = false;
				

			}
		}
		//debugger;
		knightService.updateKnight($scope.knight)
	}


	$scope.potion = function(){
		//debugger;
		if($scope.potionChoice === "yes"){
			var x = randomPotion();
			$scope.knight.potions.push(x);
			alert("Potion added to your Pack");
			$scope.directionSelect = true;
			$scope.beggar = false;
			$scope.direction = '';
			$scope.potionChoice = '';
			knightService.updateKnight($scope.knight);
		} else {
			$scope.directionSelect = true;
			$scope.beggar = false;
			$scope.direction = '';
			$scope.potionChoice = '';
		}
	}

	$scope.roll = function(){
		var x = dice();
		alert("Roll was " + x)
		if(x % 2 === 0){
			alert("You have struck the moblin! He ran away in fear!");
			// $scope.moblin = false;
			// $scope.directionSelect = true;
			// $scope.direction = '';
		} else {
			alert("You have been struck! Your HP has gone down by 2");
			$scope.knight.hp -= 2;
			knightService.updateKnight($scope.knight)
			// $scope.moblin = false;
			// $scope.directionSelect = true;
			// $scope.direction = '';
		}
			$scope.moblin = false;
			$scope.directionSelect = true;
			$scope.direction = '';
	}

	$scope.backTrack = function(){
		$scope.direction = '';
		$scope.lost = false;
		$scope.directionSelect = true;

	}
})