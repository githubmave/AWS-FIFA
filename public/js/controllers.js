'use strict';

/* Controllers */


 
  var mainController=angular.module('myApp.controllers',[]);
 
   mainController.controller('MyFoodListCtrl',function($scope,$http,$routeParams,CartItemService,CartItemFac){
 	//*****GET DATA
 	 $http.get('js/food.json').success(function(data){
 	 	
 	 	$scope.foodList2=data.foodobj;
  	
 	 });
 	
 	
 	
 	 $http.get('js/quantity.json').success(function(data){
 	 	
 	 	$scope.qutyList2=data.quantity;
  	
 	 });
 	
 	$scope.routeId=$routeParams.itemId;
 	
 	$scope.selectedQuty=1;

  $scope.loading = true;
 	
 	// $scope.cartItemList=CartItemService.list();

  // $scope.cartItemList=CartItemFac.get();


  CartItemFac.get()
      .success(function(data) {
        // $scope.todos = data;
        $scope.cartItemList = data;


        $scope.loading = false;
 });

  

 	
 	$scope.newCartItem={};
 	
 
 	
 	$scope.addToCart=function(){

 	//	var newCartItem={"name":"Japan","price":"15","Quty":"2",};
 		
 		$scope.newCartItem.NAME=$scope.foodList2[$scope.routeId].SHORTNAME;
 		$scope.newCartItem.PRICE=$scope.foodList2[$scope.routeId].PRICE;
 	//	$scope.newCartItem.QUTY=$scope.selectedQuty;
 	
 		CartItemService.addToCart($scope.newCartItem);
 		
 };


  $scope.addToMyCart=function(){

  //  var newCartItem={"name":"Japan","price":"15","Quty":"2",};
    
    $scope.newCartItem.NAME=$scope.foodList2[$scope.routeId].SHORTNAME;
    $scope.newCartItem.PRICE=$scope.foodList2[$scope.routeId].PRICE;
  //  $scope.newCartItem.QUTY=$scope.selectedQuty;
  
    CartItemFac.create($scope.newCartItem)

    .success(function(data) {
            $scope.loading = false;
            // $scope.formData = {};
            // $scope.todos = data; 
            $scope.newCartItem={};
            $scope.cartItemList = data;

          });
    
 };
 	
 // ********COUNT TOTAL PRICE
 
 $scope.countTotal=function(){
 	
 	var totalPrice=0;
 	
 	//var quty=0;
 	angular.forEach($scope.cartItemList,function(item){
 		
 		
 		    
 		totalPrice+=Number(item.PRICE)*Number(item.QUTY);
 		// totalPrice+=item.PRICE*item.QUTY;

 		
 		
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



mainController.factory('CartItemFac', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/cartItemsLs');
            },
            create : function(cartItemsData) {
                return $http.post('/api/cartItemsLs', cartItemsData);
            },
            delete : function(id) {
                return $http.delete('/api/cartItemsLs/' + id);
            }
        }
}]);
