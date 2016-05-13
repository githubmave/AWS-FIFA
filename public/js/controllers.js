'use strict';

/* Controllers */


 
  var mainController=angular.module('myApp.controllers',[]);
 
   mainController.controller('MyFoodListCtrl',function($scope,$http,$routeParams,CartItemService){
 	//*****GET DATA
 	 $http.get('js/food.json').success(function(data){
 	 	
 	 	$scope.foodList2=data.foodobj;
  	
 	 });
 	
 	
 	
 	 $http.get('js/quantity.json').success(function(data){
 	 	
 	 	$scope.qutyList2=data.quantity;
  	
 	 });
 	
 	$scope.routeId=$routeParams.itemId;
 	
 	$scope.selectedQuty=1;
 	
 	$scope.cartItemList=CartItemService.list();
 	
 	$scope.newCartItem={};
 	
   // $scope.totalPrice=0;
 	
 	//******local storage

  // $scope.$storage=$localStorage.$default({


    
  // });
 	
 	$scope.addToCart=function(){

 	//	var newCartItem={"name":"Japan","price":"15","Quty":"2",};
 		
 		$scope.newCartItem.NAME=$scope.foodList2[$scope.routeId].SHORTNAME;
 		$scope.newCartItem.PRICE=$scope.foodList2[$scope.routeId].PRICE;
 	//	$scope.newCartItem.QUTY=$scope.selectedQuty;
 	
 		CartItemService.addToCart($scope.newCartItem);
 		
 };
 	
 // ********COUNT TOTAL PRICE
 
 $scope.countTotal=function(){
 	
 	var totalPrice=0;
 	
 	//var quty=0;
 	angular.forEach($scope.cartItemList,function(item){
 		
 		
 		    
 		totalPrice+=Number(item.PRICE)*Number(item.QUTY);
 		
 		
 		
 	});
 	
 	return totalPrice;
 
 	
 };	
 
 
 
 	
 	// Navigate the foodDetail html
 	
 	if($routeParams.itemId>0){
 		
 		$scope.preItem=Number($routeParams.itemId)-1;
 	}
 	else{
 		
 		$scope.preItem=0;
 	};
 		
 	
 		$scope.nextItem=Number($routeParams.itemId)+1;
 
 
 	$scope.toggleActive=function(s){
 		s.ACTIVE=!s.ACTIVE;
 		
 	};
 	
 	
 	$scope.total = function(){

		var total = 0;
		
		

		// Use the angular forEach helper method to
		// loop through the services array:

		angular.forEach($scope.foodList2, function(s){
			if (s.ACTIVE){
				total+= s.PRICE;
			}
		});

		return total;
	};
	
	//********************Add to cart
	
	

 });
 
 


//    mainController.controller('MyFoodListCtrl',['$scope','$routeParams',function($scope,$routeParams){

mainController.controller('cartItemController', function($scope,$http,CartItemService){


  $scope.selectedTeam={};
  //*DATA******************
 
  
   $http.get('js/food.json').success(function(data){
 	 	
 	 	$scope.foodList2=data.foodobj;
  	
 	 });
 	
 	
 $http.get('js/quantity.json').success(function(data){
 	 	
 	 	$scope.qutyList2=data.quantity;
  	
 	 });

  //**************add to Cart function 
    $scope.cartItems = CartItemService.list();
    
    $scope.addToCart = function () {
        CartItemService.addToCart($scope.newItem);
        $scope.newItem = {};
    };
  
  
  
   
   $scope.deleteOrder=function(){
  
  	$scope.cartItems.splice(0,1);
  
  };
  
  
});


 


//************************************************************
//********************************************************************************************

  mainController.controller('ContactController', function ($scope, ContactService) {
 
    $scope.contacts = ContactService.list();
 
    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
    };
 
 
 
   $scope.deleteContact=function(){
  
  	$scope.contacts.splice(0,1);
  
  };
 
 
 
    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(ContactService.get(id));
    };
});