/* jshint node: true */

var when = require('when');
var less = require('less');
var vars = require('./vars');
var io = require('./io');

var config = require('./config');

var outputFile = "main.css";
var outputMapFile = outputFile + ".map";

module.exports.task = function() {

    return io.find(config.styles, {
        cwd: vars.srcRoot
    }).then(function(files){

        return less.render(files.reduce(function(s, file){
            s += '@import "' + file + '";';
            return s;
        }, ""), {
            filename: io.path([vars.srcRoot, outputFile]),
            sourceMap: {
                sourceMapURL: outputMapFile,
                sourceMapBasepath: vars.srcRoot
            }
        }).then(function(output){
            return when.all([
                io.writeText([vars.dstRoot, outputFile], output.css),
                io.writeText([vars.dstRoot, outputMapFile], output.map)
            ]);
        });

    });

};




