var React = require('react');

var UserList = require('./userList.jsx');
var AddUser = require('./addUser.jsx');

var userStore = require('../stores/userStore.js');
var userActions = require('../actions/userActions.js');

var UserListContainer = React.createClass({

    getInitialState: function(){
        return {
            users: userStore.getUsers()
        }
    },

    componentDidMount: function(){
        userActions.getUsers();
        userStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function(){
        userStore.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange: function(){
        this.setState({
            users: userStore.getUsers()
        });
    },

    render: function () {
        return (
            <div className="container">
                <h1>UserApp - Live reload</h1>
                <div></div>
                <AddUser />
                <UserList users={this.state.users} onDelete={this._deleteUser} onEdit={this._editUser}/>
            </div>
        )
    },

    _deleteUser: function (userId) {
        userActions.deleteUser(userId);
    },

    _editUser: function (userId) {
        console.log(userId);
    }

});

module.exports = UserListContainer;