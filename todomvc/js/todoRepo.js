var todoRepo = (function() {
    'use strict'

    var todos = [];

    function init() {
        todos = util.store('todos-jquery');
    }

    function getList(getFilter) {

        if (getFilter === 'active') {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        }

        if (getFilter === 'completed') {
            return todos.filter(function (todo) {
                return todo.completed;
            });
        }

        if (!getFilter){
            return todos;
        }

    }

    function toggleAll(active) {
        todos.forEach(function (todo) {
            todo.completed = active;
        });
    }

    function get(id) {
        return todos[id];
    }

    function add(item) {
        todos.push({
            id: util.uuid(),
            title: item,
            completed: false
        });
    }

    function remove(index) {
        todos.splice(index, 1);
    }

    return {
        todos: todos,
        init: init,
        getList: getList,
        remove: remove,
        add: add
    }

})();
