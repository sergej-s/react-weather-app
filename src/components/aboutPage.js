'use strict';

var React = require('react');

var About = React.createClass({
    render: function() {
        return (
            <div className='container about'>
                <h1>About</h1>
                <p>
                    React Weather App
                    created by Sergei Suslov
                </p>
            </div>
        );
    }
});

module.exports = About;