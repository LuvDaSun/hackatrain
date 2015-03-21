/* jshint node: true */

var extend = require('extend');
var args = require('./args');
var path = require('path');

extend(module.exports, {
    dstRoot: path.resolve(path.join(__dirname, '..', 'dist', args.config)),
    srcRoot: path.resolve(__dirname, '..')
});

