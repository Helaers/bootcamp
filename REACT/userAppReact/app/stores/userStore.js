var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('../appDispatcher.js');
var userActions = require('../actions/userActions');

var _ = require('lodash');

/* Data storage */
var users = [];

/* Setter methods */
var addUser = function(user){
    //users.push(user);
};

var removeUser = function(id){
    var removedUser = _.find(users, function(removedUser){
        return removedUser.id == id;
    });
    users = _.without(users, removedUser);
    //console.log(users);
};

var editUser = function(editedUser) {

    var id = _.findIndex(users, function(user){
        return user.id === editedUser.id
    });

    users[id] = editedUser;
};

/* Store definition */
var userStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener:  function(cb){
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener:  function(cb){
        this.removeListener('CHANGE_EVENT', cb);
    },
    getUsers: function () {
        return users
    },
    getOneUser: function(id){
        return foundUser = _.find(users, function(foundUser){
            return foundUser.id == id;
        });
    }
});

module.exports = userStore;

/* Registration on dispatcher */
appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType){
        case 'ADD_USER':
            addUser(action.data);
            userStore.emit('CHANGE_EVENT');
            break;

        case 'DELETE_USER':
            removeUser(action.data);
            userStore.emit('CHANGE_EVENT');
            break;

        case 'EDIT_USER':
            editUser(action.data);
            userStore.emit('CHANGE_EVENT');
            break;

        case 'USERS_LOADED':
            users = action.data;
            userStore.emit('CHANGE_EVENT');
            break;

        default:
            return true;
    }

});