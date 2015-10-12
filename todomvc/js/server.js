var express = require('express');
var morgan = require('morgan');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

//voor loggen, moet eerst staan
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/todos', function(req, res, next) {
    var todo = [
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

    ]
    res.send(todo);
});

app.get('/api/todos/:id', function(req, res, next) {
    console.log(req.params.id);
    var todo = {id: 1, name: 'sfen'}
    res.send(user);
});

app.post('/api/todos', function(req, res, next) {
    var user = req.body;
    user.id = 222;
    res.send(user);
});


app.put('/api/todos/:id', function(req, res, next) {
    console.log(req.params.id);
    console.log(req.body);
    res.send({id: 353, name: 'piet'});
});

app.delete('/api/todos/:id', function(req, res, next) {
    console.log(req.params.id);
    console.log(req.body);
    res.send({id: 12, name: 'peter'});
});

app.get('/api/products', function(req, res, next) {
    res.send('products from sample');
})

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('express server listening on port: ' + server.address().port);
})

