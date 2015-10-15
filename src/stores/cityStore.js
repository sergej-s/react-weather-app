'use strict';

var ActionTypes = require('../constants/actionTypes');

//Extend general store and bind actions with store methods.
var CityStore = require('./store').extend({
    init: function () {
        this.bind(ActionTypes.GOT_CITIES, this.set);
        this.bind(ActionTypes.ADDED_CITY, this.set);
        this.bind(ActionTypes.DELETED_CITY, this.remove);
    }
});

module.exports = CityStore;
