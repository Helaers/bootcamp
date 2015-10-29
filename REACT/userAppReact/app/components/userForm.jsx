var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var UserForm = React.createClass({

    propTypes: {
        newUser: React.PropTypes.shape({
            //id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.string.isRequired,
            birthday: React.PropTypes.string.isRequired,
            married: React.PropTypes.bool.isRequired
        }),
        onChange: React.PropTypes.func.isRequired
    },

    getInitialState: function () {

        return{
            errors: {}
        }

    },

    render: function(){
        //console.log(this.props.newUser);
        return (
            <form name="userForm" noValidate>

                <div className={this._checkError(this.state.errors.name)}>
                    <label htmlFor="">Name</label>
                    <input className="form-control" type="text" name="name" value={this.props.user.name} onChange={this.props.onChange}/>
                    <p style={{'color':'red'}}>{this.state.errors.name}</p>
                </div>

                <div className={this._checkError(this.state.errors.email)}>
                    <label htmlFor="">Email</label>
                    <input className="form-control" type="email" name="email" value={this.props.user.email} onChange={this.props.onChange}/>
                    <p style={{'color':'red'}}>{this.state.errors.email}</p>
                </div>

                <div className={this._checkError(this.state.errors.age)}>
                    <label htmlFor="">Age</label>
                    <input className="form-control" type="test" name="age" value={this.props.user.age} onChange={this.props.onChange}/>
                    <p style={{'color':'red'}}>{this.state.errors.age}</p>
                </div>

                <div className={this._checkError(this.state.errors.birthday)}>
                    <label htmlFor="">Birthday</label>
                    <input className="form-control" type="text" name="birthday" value={this.props.user.birthday} onChange={this.props.onChange}/>
                    <p style={{'color':'red'}}>{this.state.errors.birthday}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Married</label>
                    <input className="form-control" type="checkbox" name="married" checked={this.props.user.married} onChange={this.props.onChange}/>
                </div>

                <div className="form-group">
                    <input className="form-control" type="submit" className="btn btn-success" onClick={this._onSave}/>
                </div>

            </form>
        )
    },

    _onSave: function(e) {
        e.preventDefault();
        if(this._isInputValid(this.props.user)){
          this.props.onSave(e);
        }
    },

    _checkError: function(attr){
        return attr ? 'form-group has-error' : 'form-group';
    },

    _isInputValid: function (user) {
        var isValid = true;
        var errors = {};
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (user.name.length < 3) {
            isValid = false;
            errors.name = 'Name must be at least 3 chars long';
        }

        if (!emailRegex.test(user.email) ) {
            //isValid = false;
            errors.email = 'Must be an email';
        }

        if (user.age < 18) {
            isValid = false;
            errors.age = 'Age cannot be smaller then 18';
        }
        if (user.birthday === '') {
            isValid = false;
            errors.birthday = 'You left the field blank';
        }


        this.setState({
            errors: errors
        });

        return isValid;
    },


});

module.exports = UserForm;