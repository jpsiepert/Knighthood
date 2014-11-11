var app = angular.module("knighthood", ["ngRoute"])

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "Intro/intro.html",
		controller: "introCtrl"
	}).when("/forest", {
		templateUrl: "Forest/forest.html",
		controller: "forestCtrl"
	}).when("/dragon", {
		templateUrl: "Dragon/dragon.html",
		controller: "dragonCtrl",
	}).when("/success", {
		templateUrl: "success.html"
	}).when("/defeat", {
		templateUrl: "defeat.html"
	})
})
