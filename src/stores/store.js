'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var storeMethods = {
    init: function() {},
    set: function(items) {
        var currIds = this._data.map(function(m) { return m.id; });

        items.filter(function(item) {
            return currIds.indexOf(item.id) === -1;
        }).forEach(this.add.bind(this));

    },
    getAll: function() {
        return this._data;
    },
    get: function(id) {
        return this._data.filter(function(item) {
            return item.id === id;
        })[0];
    },
    add: function(item) {
        this._data.push(item);
    },
    remove: function(item) {
        var existingItem = this.get(item.id);
        if (existingItem) {
            var existingItemIndex = this._data.indexOf(existingItem);
            this._data.splice(existingItemIndex, 1);
        }
    },
    addChangeListener: function(fn) {
        this.on(CHANGE_EVENT, fn);
    },
    removeChangeListener: function(fn) {
        this.removeListener(CHANGE_EVENT, fn);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    bind: function(actionType, actionFn) {
        if (this.actions[actionType]) {
            this.actions[actionType].push(actionFn);
        } else {
            this.actions[actionType] = [actionFn];
        }
    }
};

exports.extend = function(methods) {
    var store = {
        _data: [],
        actions: {},
        mixin: {
            componentDidMount: function() {
                store.addChangeListener(this._onChange);
            },
            componentWillUnmount: function() {
                store.removeChangeListener(this._onChange);
            }
        }
    };

    assign(store, EventEmitter.prototype, storeMethods, methods);

    store.init();

    require('../dispatcher').register(function(action) {
        if (store.actions[action.actionType]) {
            store.actions[action.actionType].forEach(function (fn) {
                fn.call(store, action.data);
                store.emitChange();
            });
        }
    });

    return store;
};