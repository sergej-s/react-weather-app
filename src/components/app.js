'use strict';

var React = require('react');
var Header = require('./header');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <div className='row'>
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;