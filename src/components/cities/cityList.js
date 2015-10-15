'use strict';

var React = require('react');
var Router = require('react-router');
var CityActions = require('../../actions/cityActions');

var CityList = React.createClass({
    propTypes: {
        cities: React.PropTypes.array.isRequired
    },

    render: function() {

        var createCityRow = function(city) {

            return (<li key={city.id} className='row city-row'>
                        <div className='nine columns'>
                            <p>
                                <strong> {city.name} </strong>
                            <span className=''>
                                {city.data.weather.description}
                            </span>
                            <ul>
                                <li>temp: {_convertToCelsius(city.data.main.temp)} C</li>
                                <li>pressure: {city.data.main.pressure}</li>
                                <li>humidity: {city.data.main.humidity}</li>
                            </ul>
                            </p>
                        </div>
                        <div className='three columns delete-city'>
                            <a href="#" onClick={this.deleteCity.bind(this, city)}>Delete</a>
                        </div>
                    </li>);
        };

        return (
            <ul>
                {this.props.cities.map(createCityRow, this)}
            </ul>
        );
    },

    deleteCity: function(city, event) {
        event.preventDefault();
        CityActions.deleteCity(city);
    }

});

function _convertToCelsius(degK) {

    return Math.round(degK - 273.15);

}

module.exports = CityList;
