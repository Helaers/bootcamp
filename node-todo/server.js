var express = require('express');
var morgan = require('morgan');
var path = require('path');

var todoApi = require('./todos');

var _ = require('underscore');

var bodyParser = require('body-parser');


var app = express();

//voor loggen, moet eerst staan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/api/todos', todoApi)

//setup server
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('express server listening on port: ' + server.address().port);
})

//old

// app.get('/api/todos', function(req, res, next) {
//     res.send(todos);
// });

// app.get('/api/todos/:id', function(req, res, next) {
//     console.log(req.params.id);
//     id = req.params.id;

//     res.send(todos[id]);
//     res.status(404).send('resource not found ' + req.params.id);
// });


// app.post('/api/todos', function(req, res, next) {

//     var newtodo = req.body;

//     var todo = _.max(todos, function(todo){ return todo.id; });
//     var maxId = todo.id + 1;
//     newtodo.id = maxId;

//     res.header('location', `http://localhost:8080/api/todos/${todo.id}`);

//     todos.push(newtodo);
//     res.send(newtodo);

//     res.status(201).send('post succesfull ' + req.params.id);
// });


// app.put('/api/todos/:id', function(req, res, next) {

//     var updatedTodo = _.find(todos, function(todo){
//         return todo.id == req.params.id;
//     });

//     updatedTodo.title = req.body.title;
//     updatedTodo.completed = req.body.completed;

//     res.send(updatedTodo);
//     res.status(404).send('resource not found ' + req.params.id);
// });

// app.delete('/api/todos/:id', function(req, res, next) {

//     var deletedTodo = _.find(todos, function(todo){
//         return todo.id == req.params.id;
//     });

//     todos = _.without(todos, deletedTodo);
//     res.send(todos[deletedTodo]);
//     res.status(204).send('delete succesfull ' + req.params.id);
// });

