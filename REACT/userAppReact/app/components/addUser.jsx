var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AddUser = React.createClass({
    render: function () {
        return (
            <div>
                <Link name="add" to="/persons/add">
                    <button type="button" className="btn btn-primary">Add</button>
                </Link>
            </div>
        )
    }
});

module.exports = AddUser;
