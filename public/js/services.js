'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
//  value('version', '0.1');

var module = angular.module('myApp.services', []);
 
module.service('ContactService', function () {
    //to create unique contact id
    var uid = 1;
     
    //contacts array to hold list of all contacts
    var contacts = [{
        id: 0,
        'name': 'Bernie',
            'email': 'hello@gmail.com',
            'phone': 'brasil'
    }];
     
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }
 
    };
    
 

 
    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }
 
    };
     
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
    
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    };
 
    //simply returns the contacts list
    this.list = function () {
        return contacts;
    };
    
    
   
  
    
    
    
    
    
    
    
    
    
});
 
 
 //******************************
 //******************************
 
 
 
module.service('CartItemService', function () {

       var itemUid=1;
      // var cartItemList = [{"NAME":"APPLE","PRICE":15,"QUTY":5}];
       
       var cartItemList = [];
      
    //   var cartItemList=[{
      //  id: 0,
       // 'name': 'Jonathan',
         //   'email': 'hello@gmail.com',
          //  'phone': 'brasil'
  //  }];
     
    //save method create a new cartItem if not already exists
    //else update the existing object
    this.addToCart = function (cartItem) {
       
       var found=false;
       
      cartItemList.push(cartItem);
       
       
    };

//simply returns the cartItem list
    this.list = function () {
        return cartItemList;
    };


  // delete function***********
  
   this.Delete = function (id) {
    
        for (i in cartItemList) {
            if (cartItemList[i].id == id) {
                cartItemList.splice(i, 1);
            }
        }
    };
 
  
  
  

});

