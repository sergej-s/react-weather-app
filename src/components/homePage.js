'use strict';

var React = require('react');
var CityStore = require('../stores/cityStore');
var CityActions = require('../actions/cityActions');
var CityInput = require('./cities/cityInput');
var CityList = require('./cities/cityList');

var Home = React.createClass({
    getInitialState: function() {
        return {
            cities: CityStore.getAll()
        };
    },

    mixins: [
        CityStore.mixin
    ],

    _onChange: function() {
        this.setState({ cities: CityStore.getAll() });
    },

    render: function() {
        return (
            <div className='container main'>
                <h1>React Weather App</h1>
                <CityInput onClick={this.addCity} />
                <CityList cities={this.state.cities} />
            </div>
        );
    },

    addCity: function(cityName) {
        CityActions.addCity(cityName);
    }


});

module.exports = Home;