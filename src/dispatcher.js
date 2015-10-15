'use strict';

var flux = require('flux');

var dispatcher = new flux.Dispatcher();

dispatcher.register(function (action) {
    console.log(action);
});

module.exports = dispatcher;