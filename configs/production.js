/* jshint node: true */

var extend = require('extend');

module.exports = require('./master');

extend(module.exports.globals, {
    "gaTrackingID": "UA-61026368-1",
});
