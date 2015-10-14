var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var userApi = require('./routes/users');

var mongoose = require('mongoose');

var Faker = require('faker');
var User = require('./model/user');

var app = express();

//voor loggen, moet eerst staan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// setup db
mongoose.connect('mongodb://localhost/usersDB');

//routes
app.use('/api/users', userApi)


//create fake users - faker
User.collection.count(function (err, count) {

    if (!err && count === 0) {

        var userList = [];
        var counter = 1;

        while (counter <= 10) {
            var user = {
                name: Faker.name.findName(),
                email: Faker.internet.email(),
                age: Faker.random.number(100),
                homeAddress: {
                    addressLine: Faker.address.streetAddress(),
                    city: Faker.address.city(),
                    zip: Faker.address.country()
                }
            }
            userList.push(user);
            counter++;

            //console.log('fake user added');
        }

        // insert document into database
        User.collection.insert(userList);
    } else {
        console.log('user(s) in db');
    }
});
// User.findOne({},function(user) {

//     if (!user) {

//         var userList = [];
//         var counter = 1;

//         while (counter <= 10) {
//             var user = {
//                 name: Faker.name.findName(),
//                 email: Faker.internet.email(),
//                 age: Faker.random.number(),
//                 homeAddress: {
//                     addressLine: Faker.address.streetAddress(),
//                     city: Faker.address.city(),
//                     zip: Faker.address.country()
//                 }
//             }
//             userList.push(user);
//             counter++;

//             console.log('fake user added');
//         }

//         // insert document into database
//         User.collection.insert(userList);
//     } else {
//          console.log('user(s) in db');
//     }
// });



//server
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('express server listening on port: ' + server.address().port);
})
