/*global jQuery, Handlebars, Router */
jQuery(function ($) {
    'use strict';

    Handlebars.registerHelper('eq', function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });

    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    var App = {
        init: function () {
            //this.todos = util.store('todos-jquery');
            todoRepo.init();
            this.cacheElements();
            this.bindEvents();

            new Router({
                '/:filter': function (filter) {
                    this.filter = filter;
                    this.render();
                }.bind(this)
            }).init('/all');
        },
        cacheElements: function () {
            this.todoTemplate = Handlebars.compile($('#todo-template').html());
            this.footerTemplate = Handlebars.compile($('#footer-template').html());
            this.$todoApp = $('#todoapp');
            this.$header = this.$todoApp.find('#header');
            this.$main = this.$todoApp.find('#main');
            this.$footer = this.$todoApp.find('#footer');
            this.$newTodo = this.$header.find('#new-todo');
            this.$toggleAll = this.$main.find('#toggle-all');
            this.$todoList = this.$main.find('#todo-list');
            this.$count = this.$footer.find('#todo-count');
            this.$clearBtn = this.$footer.find('#clear-completed');
        },
        bindEvents: function () {
            var list = this.$todoList;
            this.$newTodo.on('keyup', this.create.bind(this));
            this.$toggleAll.on('change', this.toggleAll.bind(this));
            this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
            list.on('change', '.toggle', this.toggle.bind(this));
            list.on('dblclick', 'label', this.edit.bind(this));
            list.on('keyup', '.edit', this.editKeyup.bind(this));
            list.on('focusout', '.edit', this.update.bind(this));
            list.on('click', '.destroy', this.destroy.bind(this));
        },
        render: function () {
            //var todos = this.getFilteredTodos();
            var todos = todoRepo.getList(this.filter);
            this.$todoList.html(this.todoTemplate(todos));
            this.$main.toggle(todos.length > 0);
            this.$toggleAll.prop('checked', todoRepo.getList('active').length === 0);
            this.renderFooter();
            this.$newTodo.focus();
            util.store('todos-jquery', todos);
        },
        renderFooter: function () {
            var todoCount = todoRepo.getList().length;
            var activeTodoCount = todoRepo.getList('active').length;
            var template = this.footerTemplate({
                activeTodoCount: activeTodoCount,
                activeTodoWord: util.pluralize(activeTodoCount, 'item'),
                completedTodos: todoCount - activeTodoCount,
                filter: this.filter
            });

            this.$footer.toggle(todoCount > 0).html(template);
        },
        toggleAll: function (e) {
            var isChecked = $(e.target).prop('checked');

            todoRepo.toggleAll(isChecked);
            // this.todos.forEach(function (todo) {
            //     todo.completed = isChecked;
            // });

            this.render();
        },
        // getActiveTodos: function () {
        //     return this.todos.filter(function (todo) {
        //         return !todo.completed;
        //     });
        // },
        // getCompletedTodos: function () {
        //     return this.todos.filter(function (todo) {
        //         return todo.completed;
        //     });
        // },
        getFilteredTodos: function () {
            todoRepo.getList(this.filter);

            // if (this.filter === 'active') {
            //     return this.getActiveTodos();
            // }

            // if (this.filter === 'completed') {
            //     return this.getCompletedTodos();
            // }

            // return this.todos;
        },
        destroyCompleted: function () {
            todos = todoRepo.getList('active');
            this.filter = 'all';
            this.render();
        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        indexFromEl: function (el) {
            var id = $(el).closest('li').data('id');
            var todos = todoRepo.getList();
            var i = todos.length;

            while (i--) {
                if (todos[i].id === id) {
                    return i;
                }
            }
        },
        create: function (e) {
            var $input = $(e.target);
            var val = $input.val().trim();

            if (e.which !== ENTER_KEY || !val) {
                return;
            }

            todoRepo.add(val);

            // this.todos.push({
            //     id: util.uuid(),
            //     title: val,
            //     completed: false
            // });

            $input.val('');

            this.render();
        },
        toggle: function (e) {
            var i = this.indexFromEl(e.target);
            todoRepo.get(i).completed = !todoRepo.get(i).completed;
            this.render();
        },
        edit: function (e) {
            var $input = $(e.target).closest('li').addClass('editing').find('.edit');
            $input.val($input.val()).focus();
        },
        editKeyup: function (e) {
            if (e.which === ENTER_KEY) {
                e.target.blur();
            }

            if (e.which === ESCAPE_KEY) {
                $(e.target).data('abort', true).blur();
            }
        },
        update: function (e) {
            var el = e.target;
            var $el = $(el);
            var val = $el.val().trim();

            if ($el.data('abort')) {
                $el.data('abort', false);
                this.render();
                return;
            }

            var i = this.indexFromEl(el);
            todoRepo.update(i, val);

            // if (val) {
            //     this.todos[i].title = val;
            // } else {
            //     this.todos.splice(i, 1);
            // }

            this.render();
        },
        destroy: function (e) {
            todoRepo.remove(this.indexFromEl(e.target));
            //this.todos.splice(this.indexFromEl(e.target), 1);
            this.render();
        }
    };

    App.init();

});