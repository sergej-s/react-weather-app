'use strict';

Object.fetch = Object.fetch || require('whatwg-fetch');
Object.promise = Object.promise || require('es6-promise');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var API = require('./api/api');

API.fetchCities();
geoFindMe();

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});

function geoFindMe() {

    if (!navigator.geolocation){
        return;
    }

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        API.addCityByGeoCoord(latitude, longitude);
    }

    navigator.geolocation.getCurrentPosition(success);
}