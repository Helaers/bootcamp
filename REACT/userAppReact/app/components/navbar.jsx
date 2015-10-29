var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var userCounterStore = require('../stores/userCounterStore.js');

var navBar = React.createClass({

    getInitialState: function(){
        return {
            userCount: userCounterStore.getUserCount()
        }
    },

    componentDidMount: function(){
        userCounterStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function(){
        userCounterStore.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange: function(){
        this.setState({
            userCount: userCounterStore.getUserCount()
        });
    },

    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className={this._setActive('home')}>
                            <Link onClick={this.props.setName} name="home" to="/">Home</Link>
                        </li>
                        <li className={this._setActive('persons')}>
                            <Link onClick={this.props.setName} name="persons" to="/persons">Persons ({this.state.userCount})</Link>
                        </li>
                        {/*<li className={this.props.tabName === 'persons' ? 'active' :  ''}>
                            <Link onClick={this.props.setName} name="persons" to="/persons">Persons</Link>
                        </li>*/}
                    </ul>
                </div>
            </nav>
        )
    },

    _setActive: function(tab) {
        if (this.props.tabName === tab) {
            return 'active';
        } else {
            return '';
        }
    }
});

module.exports = navBar;