var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var UserList = React.createClass({

    render: function(){


        if (this.props.users.length == 0) {
            return (
                <div>
                    <p>No persons present</p>
                </div>
            )
        }

        return (

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Birthday</th>
                    <th>Maried</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this._renderUsers()}
                </tbody>
            </table>


        )
    },

    _renderUsers: function(){

        var self = this;

        var renderedUsers = this.props.users.map(function(user, index){

            return  <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.birthday}</td>
                <td>{self._isMarried(user.married)}</td>
                <td>
                    <div class="btn-group">

                        <Link name="add" to={`/persons/${user.id}`}>
                            <button type="button" className="btn btn-primary" onClick={(self.props.onEdit).bind(null, user.id)}>Edit</button>
                        </Link>

                        <button type="button" className="btn btn-danger" onClick={(self.props.onDelete).bind(null, user.id)}>Delete</button>
                    </div>
                </td>
            </tr>
        });

        return renderedUsers;
    },

    _isMarried: function(married){

        if (!married) {
            return <span className="glyphicon glyphicon-unchecked"></span>
        } else {
            return <span className="glyphicon glyphicon-check"></span>
        }
    }
});

module.exports = UserList;