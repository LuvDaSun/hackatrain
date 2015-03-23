/* jshint node: true */

var Q = require('q');
var UglifyJS = require("uglify-js");
var vars = require('./vars');
var io = require('./io');

var config = require('./config');

var outputFile = "main.js";
var outputMapFile = outputFile + ".map";

module.exports = io.find(config.scripts, {
    cwd: vars.srcRoot
}).then(function(files) {
    var output = UglifyJS.minify(files, {
        mangle: false,
        outSourceMap: outputMapFile,
        sourceMapIncludeSources: true
    });

    return Q.all([
        io.writeText([vars.dstRoot, outputFile], output.code),
        io.writeText([vars.dstRoot, outputMapFile], output.map)
    ]);
});
