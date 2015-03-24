/* jshint node: true */

var vars = require('./vars');
var io = require('./io');

var filename = 'robots.txt';
var content = [
    "User-agent: *",
    "Allow: /",
    ""
];

module.exports = io.writeText([vars.dstRoot, filename], content);
