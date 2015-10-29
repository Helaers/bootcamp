var dispatcher = require('flux').Dispatcher;
var appDispatcher = new dispatcher();

appDispatcher.handleAction = function (action) {
    this.dispatch({
        action: action
    });
};

module.exports = appDispatcher;