var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var createBrowserHistory = require('history/lib/createBrowserHistory');

var Home = require('./components/home.jsx')
var UserListContainer = require('./components/userListContainer.jsx');
var Navbar = require('./components/navbar.jsx');

var UserAddContainer = require('./components/userAddContainer.jsx');
var UserEditContainer = require('./components/userEditContainer.jsx');

var userActions = require('./actions/userActions.js');
var userStore = require('./stores/userStore.js');

var App = React.createClass({
    getInitialState: function(){
        return {
            tabName: ''
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

    render: function(){
        return (
            <div>
                <Navbar tabName={this.state.tabName} setName={this._setTabName}/>
                {this.props.children}
            </div>

        )
    },

    _setTabName: function(e){
        var tabName;
        console.log(e.target.name);
        tabName = e.target.name;

        this.setState({
            tabName: tabName
        });
    }
});

//ReactDOM.render(<UserAppContainer />, document.getElementById('app'));

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="persons" component={UserListContainer} />
            <Route path="persons/add" component={UserAddContainer} />
            <Route path="persons/:id" component={UserEditContainer} />
        </Route>
    </Router>

), document.getElementById('app'));