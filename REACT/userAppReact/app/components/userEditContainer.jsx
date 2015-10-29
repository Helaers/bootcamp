var React = require('react');

var UserForm = require('./userForm.jsx');
var AddUser = require('./addUser.jsx');

var userStore = require('../stores/userStore.js');
var userActions = require('../actions/userActions.js');

var UserAddContainer = React.createClass({

    getInitialState: function(){
        return {
            editedUser: userStore.getOneUser(this.props.params.id),
            id: 0

        }
    },

    componentDidMount: function(){
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
                <h1>Edit user</h1>

                <UserForm user={this.state.editedUser}
                          onChange={this._handleChange}
                          onSave={this._editUser}
                          errors={this.state.errors}/>

            </div>
        )
    },

    _handleChange: function (e) {
        var user = this.state.editedUser;
        //name verwijst naar name-attr van element

        if (e.target.type === 'checkbox') {

            user[e.target.name] = e.target.checked;
        } else {
            user[e.target.name] = e.target.value;
        }

        this.setState({
            editedUser: user
        })
    },

    _editUser: function() {


        //if(this._isInputValid(this.state.newUser)){

            console.log('clicked edit');
            userActions.editUser(this.state.editedUser);

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
        //}

    }

});

module.exports = UserAddContainer;