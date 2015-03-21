/* jshint node: true */

var extend = require('extend');
var args = require('./args');

extend(module.exports, require('../configs/' + args.config));

extend(module.exports, {
    appConfig: args.config,
    appBuild: args.build
});



