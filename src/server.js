/* jshint node: true */

var express = require('express');

module.exports = function(config) {
    var server = express();

    server.use('/public', express.static(__dirname + '/../public'));
    server.use('/bower_components', express.static(__dirname + '/../bower_components'));

    return server;
};
