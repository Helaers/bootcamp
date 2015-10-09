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

        return todos;
    }

    function toggleAll(active) {

        todos.forEach(function (todo) {
            todo.completed = active;
        });
    }

    function getId(id) {
        return todos[id].id;
    }


    // function add(item) {

    //     this.todos.push({
    //         id: util.uuid(),
    //         title: item,
    //         completed: false
    //     });
    // }

    // function destroy(e) {
    //     this.todos.splice(this.indexFromEl(e.target), 1);
    //     this.render();
    // }

    return {
        todos: todos,
        init: init,
        getList: getList
        //add: add
    }

})();