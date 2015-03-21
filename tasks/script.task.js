/* jshint node: true */

var when = require('when');
var UglifyJS = require("uglify-js");
var vars = require('./vars');
var io = require('./io');

var config = require('./config');

module.exports.task = function() {
    var outputFile = "main.js";
    var outputMapFile = outputFile + ".map";
    
    return io.find(config.scripts, {
        cwd: vars.srcRoot
    }).then(function(files){
        var output = UglifyJS.minify(files, {
            mangle: false,
            outSourceMap: outputMapFile,
            sourceMapIncludeSources: true
        });
                
        return when.all([
            io.writeText([vars.dstRoot, outputFile], output.code),
            io.writeText([vars.dstRoot, outputMapFile], output.map)
        ]);
    });
};



