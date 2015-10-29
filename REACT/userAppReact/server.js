// node definition

// server.js
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');
var httpProxy = require('http-proxy');

// setup server
var app = express();
var proxy = httpProxy.createProxyServer();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var persons = [
    {
        id: 1,
        name: "Frederik",
        email: "frederik.bouillon@euri.com",
        age: 28,
        birthday: "16/04/1987",
        married: false
    }, {
        id: 2,
        name: "Peter",
        email: "peter.cosemans@euri.com",
        age: 51,
        birthday: "06/10/1964",
        married: true
    }
];

var generatePersonId = function() {
    if (persons.length > 0) {
        var lastPerson = persons[persons.length - 1];
        return lastPerson.id + 1;
    }
    return 1;
};

// 'GET api/persons' - get all persons
app.get('/api/persons', function(req, res, next) {
    res.send(persons);
});

// 'GET api/persons/:id' - get one person
app.get('/api/persons/:id', function(req, res, next) {
    var todo = _.findWhere(persons, { id: Number(req.params.id)});

    if (todo) {
        return res.send(todo);
    }

    res.status(404).send('Not found');
});

// 'POST api/persons' - create a new person
app.post('/api/persons', function(req, res, next) {

    var resource = req.body;

    resource.id = generatePersonId();
    persons.push(resource);
    res.status(200).send(resource);


});

// 'PUT api/persons' - update an existing person
app.put('/api/persons/:id', function(req, res, next) {

    var resource = req.body;

    var person = _.findWhere(persons, { id: Number(req.params.id)});
    if (person) {
        person.name = resource.name;
        person.email = resource.email;
        person.age = resource.age;
        person.birthDate = resource.birthDate;
        person.married = resource.married;
        return res.status(200).send(person);
    }

    res.status(404).send('not found');
});

// 'DELETE api/persons/:id' - delete a person
app.delete('/api/persons/:id', function(req, res, next) {
    var person = _.findWhere(persons, { id: Number(req.params.id)});
    persons = _.without(persons, person);
    res.status(200).send(person);
});

// static content to host our app
app.use(express.static(__dirname + '/app'));

var webpackServer = require('./webpackServer.js');
webpackServer();

// Any requests to localhost:3000 is proxied
// to webpack-dev-server
app.all('/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
});

//catch any errors from the proxy or the server will crash
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
})

// Start server
app.listen(3000, 'localhost', function () {
    console.log('Express server listening on %d, in %s mode', 8080, 'localhost');
});