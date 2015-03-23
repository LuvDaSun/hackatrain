/* jshint node: true */

var when = require('when');
var express = require('express');

var config = require('./config');
var args = require('./args');
var vars = require('./vars');

var app = express();

app.use('/', express.static(vars.dstRoot));

module.exports = require('./dist.task').then(function(dist) {

    return when.promise(function(resolve, reject) {
        var server = app.listen(args.port, function() {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Static server listening at http://%s:%s', host, port);
            resolve(server);
        });
    });

});
