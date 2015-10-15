'use strict';

var Dispatcher = require('../dispatcher');
var Actions = require('../actions/cityActions');
var ActionTypes = require('../constants/ActionTypes');

var APPID = 'da06cf8106afb34ae1142a4beb9ed1aa';
var LS_PREFIX = 'cities-';
var OPENWEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';

//API fetches city wheather from openweathermap.org and populates to localStorage.
//For simplicity suppose that app will work in the new browsers where localStorage is available.

var API = module.exports = {
    fetchCities: function() {
        var cities = [];
        if (localStorage.length) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).indexOf(LS_PREFIX) !== -1) {
                    cities.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                }
            }
        }
        Actions.gotCities(cities);
    },

    addCity: function(cityName) {
        if (cityName === '') return;
        _get(OPENWEATHER_URL + '?q=' + cityName
            + '&APPID=' + APPID)
            .then(function(data) {
                _addCity(data);
            });
    },

    addCityByGeoCoord: function(lat, lon) {
        _get(OPENWEATHER_URL + '?lat=' + lat
            + '&lon=' + lon
            + '&APPID=' + APPID)
            .then(function(data) {
                _addCity(data);
            });
    },

    removeCity: function(city) {
       localStorage.removeItem(LS_PREFIX + city.id);
       setTimeout(Actions.deletedCity.bind(null,city), 0);
    }
};

function _get(url) {
    //Use new fetch method for AJAX calls. Doesn't work in IE, Safari.
    return fetch(url).then(function (res) {
        return res.json();
    });
}

var _addCity = function(data) {
    var city = {};
    city.id = data.id;
    city.name = data.name + ', ' + data.sys.country;
    city.data = data;

    var lskey = LS_PREFIX + city.id;
    if (!localStorage.getItem(lskey)) {
        localStorage.setItem(lskey, JSON.stringify(city));
    }

    Actions.addedCity([city]);
};

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.ADD_CITY:
            API.addCity(action.data);
            break;
        case ActionTypes.DELETE_CITY:
            API.removeCity(action.data);
            break;
        default:
            break;
    }

});
