/* jshint node: true */

var pkg = require('../package.json');

module.exports = {

    "globals": {
        "appName": pkg.name,
        "appVersion": pkg.version,
    },

    "scripts": [

        "public/main.js",
        "public/ga.js",

    ],
    "styles": [
        "public/*.less"
    ],

    "assets": {},

};
