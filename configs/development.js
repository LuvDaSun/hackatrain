/* jshint node: true */

var extend = require('extend');

module.exports = require('./master');

extend(module.exports, {
    "aws": {
        "region": "eu-central-1",
        "params": {
            "Bucket": "hackatrain.luvdasun.com"
        }
    }
});

