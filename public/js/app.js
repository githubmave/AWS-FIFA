'use strict';


// Declare app level module which depends on filters, and services
//angular.module('myApp', [
 // 'ngRoute',
 // 'myApp.filters',
 // 'myApp.services',
 // 'myApp.directives',
 // 'myApp.controllers'
//]).
//config(['$routeProvider', function($routeProvider) {
 // $routeProvider.when('/view1', {templateUrl: 'partials/poartial1.html', controller: 'MyCtrl1'});
//  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
 // $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl2'});
 // $routeProvider.when('/view4', {templateUrl: 'partials/partial4.html', controller: 'MyCtrl2'});
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);


angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.services',
  'ngStorage'
  
]).
 config(['$routeProvider',function($routeProvider){
 	$routeProvider.when('/foodListView',{templateUrl:'partials/foodList.html',controller:'MyFoodListCtrl'});
 	$routeProvider.when('/foodListView/:itemId',{templateUrl:'partials/foodDetail.html',controller:'MyFoodListCtrl'});
  	$routeProvider.when('/wantBuy',{templateUrl:'partials/wantBuy.html',controller:'cartItemController'});
  	$routeProvider.when('/wantSay',{templateUrl:'partials/wantSay.html',controller:'ContactController'});

    $routeProvider.when('/Save Trips',{templateUrl:'partials/saveTrips.html',controller:'storageCtrl'});

    $routeProvider.otherwise({redirectTo:'/foodListView'});	
 
 	
 	
 }])

 .controller('storageCtrl',function($scope,$localStorage){






 });


