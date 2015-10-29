var React = require('react');

var UserForm = require('./userForm.jsx');
var AddUser = require('./addUser.jsx');

var userStore = require('../stores/userStore.js');
var userActions = require('../actions/userActions.js');

var UserAddContainer = React.createClass({

    getInitialState: function(){
        return {
            users: userStore.getUsers(),
            newUser: {
                id: 0,
                name: "",
                email: "",
                age: "",
                birthday: "",
                married: false
            },
            id: 0

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
                <h1>Add user</h1>

                <UserForm user={this.state.newUser}
                          onChange={this._handleChange}
                          onSave={this._addNewUser}
                          errors={this.state.errors}/>

            </div>
        )
    },

    _handleChange: function (e) {
        var user = this.state.newUser;
        //name verwijst naar name-attr van element

        if (e.target.type === 'checkbox') {
            user[e.target.name] = e.target.checked;
        } else {
            user[e.target.name] = e.target.value;
        }

        this.setState({
            newUser: user
        })
    },

    _addNewUser: function(e) {
        e.preventDefault();

       // if(this._isInputValid(this.state.newUser)){

            this.state.newUser.id = this._generateUserId(this.state.users);
            this.state.newUser[e.target.name] = e.target.value;

            userActions.addUser(this.state.newUser);

            this.setState({
                //users: this.state.users.concat(this.state.newUser),
                newUser: {
                    id: '',
                    name: "",
                    email: "",
                    age: "",
                    birthday: "",
                    married: false
                }
            })
            this.props.history.pushState(null, '/persons');


    },

    _generateUserId: function(users) {
        if (users.length > 0) {
            var lastUser = users[users.length - 1];
            return lastUser.id + 1;
        }
        return 1;
    }

});

module.exports = UserAddContainer;