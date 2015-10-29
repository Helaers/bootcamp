var request = require('superagent');

var api = {

    getUsers: function (cb) {
        request
            .get('http://localhost:3000/api/persons')
            .end(function (err, res) {
                cb(err, res);
            });
    },

    postUser: function (user, cb) {
        request
            .post('http://localhost:3000/api/persons')
            .send(user)
            .end(function (err, res) {
                cb(err,res)
            });
    }
};


module.exports = api;