'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
    <Route name='app' path='/' handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homePage')} />
        <Route name='about' handler={require('./components/aboutPage')} />
    </Route>
);

module.exports = routes;
