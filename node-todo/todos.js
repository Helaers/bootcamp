var express = require('express');
var router = express.Router();

var todos = [
    {
        id: 0,
        title: 'Task',
        completed: true
    },
    {
        id: 1,
        title: 'Task1',
        completed: false
    },
    {
        id: 2,
        title: 'Task2',
        completed: false
    },
    {
        id: 3,
        title: 'Task3',
        completed: false
    },
    {
        id: 4,
        title: 'Task4',
        completed: false
    }

]

router.get('/', function(req, res, next) {
    res.send(todos);
});

router.get('/:id', function(req, res, next) {
    //console.log(req.params.id);
    id = req.params.id;

    var todo = _.findWhere(todos, {id: +req.params.id});

    if (!todo) {
        res.status(404).send('resource not found ' + req.params.id);
    }

    res.send(todos[id]);
});


router.post('/', function(req, res, next) {

    var resource = req.body;

    var todo = _.max(todos, function(todo){ return todo.id; });
    var maxId = todo.id + 1;
    resource.id = maxId;

    res.header('location', `http://localhost:8080/api/todos/${todo.id}`);

    todos.push(resource);
    res.send(resource);

    res.status(201).send('post succesfull ' + req.params.id);
});


router.put('/:id', function(req, res, next) {

    var updatedTodo = _.find(todos, function(todo){
        return todo.id == req.params.id;
    });

    if (!updatedTodo) {
        res.status(404).send('resource not found ' + req.params.id);
    }

    updatedTodo.title = req.body.title;
    updatedTodo.completed = req.body.completed;

    res.send(updatedTodo);
});

router.delete('/:id', function(req, res, next) {

    var deletedTodo = _.find(todos, function(todo){
        return todo.id == req.params.id;
    });

    todos = _.without(todos, deletedTodo);
    res.send(todos[deletedTodo]);
    res.status(204).send('delete succesfull ' + req.params.id);
});



module.exports = router;
