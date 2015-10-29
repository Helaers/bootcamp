var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var appDispatcher = require('../appDispatcher.js');

var _ = require('lodash');

/* Data storage */
var userCount;

/* Setter methods */
var increment = function(){
    userCount ++;
};

var decrement = function(){
    userCount --;
};

var setUserCount = function (users) {
    //console.log(users);
    userCount = users.length;
};


/* Store definition */
var userCounterStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener:  function(cb){
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener:  function(cb){
        this.removeListener('CHANGE_EVENT', cb);
    },
    getUserCount: function() {
        return userCount;
    }
});

module.exports = userCounterStore;

/* Registration on dispatcher */
appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType){
        case 'ADD_USER':
            increment();
            userCounterStore.emit('CHANGE_EVENT');
            break;

        case 'DELETE_USER':
            decrement();
            userCounterStore.emit('CHANGE_EVENT');
            break;

        case 'USERS_LOADED':
            setUserCount(action.data);
            userCounterStore.emit('CHANGE_EVENT');
            break;

        default:
            return true;
    }

});
