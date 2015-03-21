/* jshint node: true */

var path = require('path');
var vars = require('./vars');
var io = require('./io');

module.exports.task = function() {
    var filename = 'robots.txt';
    var content = [
        "User-agent: *",
        "Allow: /",
        ""
    ];

    return io.writeText([vars.dstRoot, filename], content);
};
