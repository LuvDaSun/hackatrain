/* jshint node: true */

var Q = require('q');
var extend = require('extend');
var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var mkdirp = require('mkdirp');
var glob = require('glob');

var io = module.exports;

var when_readFile = Q.nfbind(fs.readFile);
var when_writeFile = Q.nfbind(fs.writeFile);
var when_mkdirp = Q.nfbind(mkdirp);
var when_glob = Q.nfbind(glob);

extend(io, {
    path: function(parts) {
        if (Array.isArray(parts)) parts = _.flatten(parts);
        else parts = [parts];
        return path.join.apply(path, parts);
    },
    ensureDirectory: function(directory) {
        return when_mkdirp(directory);
    },
    basename: function(filename) {
        return path.basename(filename);
    }
});


extend(io, {
    find: function(patterns, options) {
        if (Array.isArray(patterns)) patterns = _.flatten(patterns);
        else patterns = [patterns];

        return Q.all(patterns.map(function(pattern) {
            return when_glob(pattern, options);
        })).then(function(files) {
            return _.flatten(files);
        });
    }
});


extend(io, {
    writeText: function(file, content) {
        file = io.path(file);

        if (Array.isArray(content)) content = _.flatten(content).join('\n');

        console.log(' + ' + path.relative(process.cwd(), file));

        return io.ensureDirectory(path.dirname(file)).then(function() {
            return when_writeFile(file, content, 'utf8');
        });
    },
    readText: function(file) {
        file = io.path(file);

        return when_readFile(file, 'utf8');
    }
});



extend(io, {
    writeBinary: function(file, content) {
        file = io.path(file);

        if (Array.isArray(content)) content = _.flatten(content).join('\n');

        console.log(' + ' + path.relative(process.cwd(), file));

        return io.ensureDirectory(path.dirname(file)).then(function() {
            return when_writeFile(file, content);
        });
    },
    readBinary: function(file) {
        file = io.path(file);

        return when_readFile(file);
    }
});

extend(io, {
    copy: function(src, dst) {
        return io.readBinary(src).then(io.writeBinary.bind(io, dst));
    }
});
