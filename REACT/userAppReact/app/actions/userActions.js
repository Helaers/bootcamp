var appDispatcher = require('../appDispatcher.js');
var userApi = require('../api/userApi');

var userActions = {

    getUsers: function () {
        userApi.getUsers(function (err, res) {
            if (res && res.status == 200) {
                appDispatcher.handleAction({
                    actionType: 'USERS_LOADED',
                    data: JSON.parse(res.text)
                })
            }
        })
    },

    addUser: function (user) {

        userApi.postUser(user, function (err, res) {
            if (res && res.status == 200) {
                appDispatcher.handleAction({
                    actionType: 'ADD_USER',
                    data: JSON.parse(res.text)
                })
            }
        })
    },
    deleteUser: function (id) {
        appDispatcher.handleAction({
            actionType: 'DELETE_USER',
            data: id
        });
    },
    editUser: function (user) {
        appDispatcher.handleAction({
            actionType: 'EDIT_USER',
            data: user
        });
    }
};

module.exports = userActions;