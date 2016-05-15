var Todo = require('./models/todo');

var aws=require('aws-sdk');

aws.config.update({accessKeyId: 'AKIAIUQ5OWX24OGOLQ5A', secretAccessKey: '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'}); 


aws.config.update({region: 'us-east-1'}); 


var db = new aws.DynamoDB(); 

var dbClient = new aws.DynamoDB.DocumentClient();

dbClient.scan({ 
        TableName : "Ticket_Tb", 
        Limit : 50 
        }, function(err, data) { 
        if (err) { console.log(err); 
        return; } 
        console.log(data.Items); 
        for (var ii in data.Items) { 
        ii = data.Items[ii]; 
        console.log(ii.ID); 
        console.log(ii.TITLE); 
        
        } 
        }
        ); 



function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};