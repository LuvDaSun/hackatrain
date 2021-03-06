/* jshint node: true */

var Q = require('q');
var express = require('express');

var args = require('./args');
var vars = require('./vars');

var app = express();

app.use('/', express.static(vars.dstRoot));

module.exports = require('./dist').then(function(dist) {

    return Q.promise(function(resolve, reject) {
        var server = app.listen(args.port, function() {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Static server listening at http://%s:%s', host, port);
            resolve(server);
        });
    });

});
