var Todo = require('./models/todo');

var aws=require('aws-sdk');

aws.config.update({accessKeyId: 'AKIAIUQ5OWX24OGOLQ5A', secretAccessKey: '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'}); 


aws.config.update({region: 'us-east-1'}); 


var db = new aws.DynamoDB(); 

var dbClient = new aws.DynamoDB.DocumentClient();

dbClient.scan({ 
        TableName : "CartItems_Tb", 
        Limit : 50 
        }, function(err, data) { 
        if (err) { console.log(err); 
        return; } 
        console.log(data.Items); 
        for (var ii in data.Items) { 
        ii = data.Items[ii]; 
        console.log(ii.NAME); 
        console.log(ii.PRICE); 
        console.log(ii.QUTY)
        
        } 
        }
        ); 




function getCartItmes(res) {

     dbClient.scan({ 
            TableName : "CartItems_Tb", 
            Limit : 50 
            }, function(err, data) { 
                if (err) { console.log(err); 
                return; } 


                res.json(data.Items);
                
            }
        ); 
    
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    
    //------------------------


    app.get('/api/cartItemsLs', function (req, res) {
        // use mongoose to get all todos in the database
        // getTodos(res);

       getCartItmes(res);


    });





    // create todo and send back all todos after creation
    app.post('/api/cartItemsLs', function (req, res) {

       //------------------------------

       dbClient.put({

                TableName:"CartItems_Tb",
                Item:{
                "NAME": req.body.NAME,
                "PRICE": req.body.PRICE,
                "QUTY": req.body.QUTY

               
                      }
           


               }, function(err, data) {
                    if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Added item:", JSON.stringify(data, null, 2));
                        }
            

                      getCartItmes(res);
                      
               });
      });



    // delete a cartItem

    app.delete('/api/cartItemsLs/:item_id', function (req, res){

             dbClient.delete({

                 _id: req.params.item_id,
                TableName:"CartItems_Tb",
                Key:{
                  "NAME": req.params.item_id
                // "PRICE": req.body.PRICE,
                // "QUTY": req.body.QUTY

               
                    }
           


               }, function(err, data) {
                    if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Added item:", JSON.stringify(data, null, 2));
                        }
            

                      getCartItmes(res);
                      
               });

           
    });



    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};