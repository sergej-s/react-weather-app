'use strict';

var Dispatcher = require('../dispatcher');
var ActionTypes  = require('../constants/actionTypes');

//Automatically generate Actions according to ActionTypes
Object.keys(ActionTypes).forEach(function (key) {

    var funcName = key.split('_').map(function (word, i) {
        if (i === 0) return word.toLowerCase();
        return word[0] + word.slice(1).toLowerCase();
    }).join('');

    exports[funcName] = function (data) {
        Dispatcher.dispatch({
            actionType: ActionTypes[key],
            data: data
        });
    };
});
