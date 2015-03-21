/* jshint node: true */

var extend = require('extend');
var nopt = require('nopt');

extend(module.exports, {
    config: 'local',
    build: (new Date()).valueOf(),
    port: 8080
});

extend(module.exports, nopt({
    "config": [String],
    "build": [String],
    "port": [Number]
}, {}, process.argv, 2));

