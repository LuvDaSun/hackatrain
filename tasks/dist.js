/* jshint node: true */

var Q = require('q');

module.exports = Q.all([
    require('./script'),
    require('./style'),
    require('./html'),
    require('./robots'),
]);
