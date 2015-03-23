/* jshint node: true */

var Q = require('q');

module.exports = Q.all([
    require('./script.task'),
    require('./style.task'),
    require('./html.task'),
    require('./robots.task'),
]);
