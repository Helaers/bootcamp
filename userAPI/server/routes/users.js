var express = require('express');
var router = express.Router();
var _ = require('underscore');

var User = require('../model/user');
var userMapper = require('../mapper/userMapper');

//get all --> /api/users?page=0&pageSize=20&sort=-age
router.get('/', function(req, res, next) {

    var pageSize = req.query.pageSize || 100;
    var page = req.query.page || 0;

    //paging & sorting
    User.find()
        .limit(pageSize)
        .skip(pageSize * page)
        .sort(req.query.sort)
        .exec(function(err, users){

            if (!users) {
                return res.status(404).send('Resources not found');
            }

            var resources = _.map(users, function(user){
                return userMapper.map(user);
            });

            res.status(200).send(resources);

    });

});

//get single user
router.get('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if (!user) {
            return res.status(404).send('Resource not found');
        }
        var resource = userMapper.map(user);
        res.status(200).send(resource);

    });

});

//post
router.post('/', function(req, res, next) {

    //split name
    var fullName = req.body.name;

    if (!fullName) {
        return res.status(204).send('No Content');
    }

    var splittedName = nameSplitter(fullName);

    var user = new User({
        firstName: splittedName.firstName,
        lastName: splittedName.lastName,
        age: req.body.age,
        email: req.body.email,
        homeAddress: {
            addressLine: req.body.addressLine,
            city: req.body.city,
            zip: req.body.zip
        }
    });

    if (user.firstName === undefined || user.firstName === '') {
        return res.status(204).send('No Content');
    }

    user.save(function(err){
        if (err) {
            return res.status(500).send('Internal server error' + err);
        }
        res.header('location', `http://localhost:8080/api/users/${user._id}`);

        var resource = userMapper.map(user);
        res.status(201).send(resource);
    });

});

//put
router.put('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {

         if (!user) {
            return res.status(404).send('user not found');
        }

        var resource = req.body;

        user.name = resource.name;
        user.age = resource.age;
        user.email = resource.email;
        user.homeAddress.addressLine = resource.addressLine;
        user.homeAddress.city = resource.city;
        user.homeAddress.zip = resource.zip;

        user.save(function(err){
            if (err) {
                return res.status(400).send('Bad Request');
            }
            var resource = userMapper.map(user);
            res.status(200).send(resource);
        })

    });
});

//delete
router.delete('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {

        if (!user) {
            return res.status(204).send('No Content');
        }

        user.remove(function(err){
            if (err) {
                return res.status(500).send('Failed to remove resource:' + err);
            }

            var resource = userMapper.map(user);
            res.status(200).send(resource);
        })

    });
});


module.exports = router;


function nameSplitter(fullname) {

    var index = fullname.indexOf(" ");
    var firstName = fullname.substr(0, index);
    var lastName = fullname.substr(index + 1);

    return {
        firstName: firstName,
        lastName: lastName

    }
}


