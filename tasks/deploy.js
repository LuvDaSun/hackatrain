/* jshint node: true */

var when = require('when');
var when_node = require('when/node');

var config = require('./config');
var args = require('./args');
var vars = require('./vars');

var io = require('./io');
var AWS = require('aws-sdk');
var zlib = require('zlib');

var when_gzip = when_node.lift(zlib.gzip);

var s3bucket = new AWS.S3(config.aws);

var when_listObjects = when_node.lift(s3bucket.listObjects.bind(s3bucket));
var when_deleteObjects = when_node.lift(s3bucket.deleteObjects.bind(s3bucket));
var when_putObject = when_node.lift(s3bucket.putObject.bind(s3bucket));

module.exports = require('./dist').then(function(dist) {

    return when_listObjects().then(function(objects) {
        if (objects.Contents.length === 0) return;

        return when_deleteObjects({
            Delete: {
                Quiet: true,
                Objects: objects.Contents.map(function(content) {
                    return {
                        Key: content.Key
                    };
                })
            }
        });
    }).then(function() {
        return io.find('**/*.jpg', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadBinary.bind(null, 'image/jpeg')));
        });

    }).then(function() {
        return io.find('**/*.png', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadBinary.bind(null, 'image/png')));
        });

    }).then(function() {
        return io.find('**/*.gif', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadBinary.bind(null, 'image/gif')));
        });

    }).then(function() {
        return io.find('**/*.ico', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadBinary.bind(null, 'image/x-icon')));
        });

    }).then(function() {
        return io.find('**/*.woff', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadBinary.bind(null, 'application/font-woff')));
        });

    }).then(function() {
        return io.find('**/*.ttf', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadBinary.bind(null, 'application/octet-stream')));
        });

    }).then(function() {
        return io.find('**/*.svg', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'image/svg+xml')));
        });

    }).then(function() {
        return io.find('**/*.html', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'text/html')));
        });

    }).then(function() {
        return io.find('**/*.css', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'text/css')));
        });

    }).then(function() {
        return io.find('**/*.js', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'text/javascript')));
        });

    }).then(function() {
        return io.find('**/*.map', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'application/json')));
        });

    }).then(function() {
        return io.find('**/*.txt', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'text/plain')));
        });

    }).then(function() {
        return io.find('**/*.appcache', {
            cwd: vars.dstRoot
        }).then(function(files) {
            return when.all(files.map(uploadText.bind(null, 'text/cache-manifest')));
        });

    });

});

function uploadText(type, file) {
    return io.readText([vars.dstRoot, file]).then(function(content) {
        return new Buffer(content, 'utf8');
    }).then(when_gzip).then(function(content) {
        return when_putObject({
            Key: file,
            ContentType: '' + type + '; charset=utf-8',
            ContentEncoding: 'gzip',
            Body: content
        });
    }).then(function() {
        console.log(' ^ ' + file);
        return file;
    });

}

function uploadBinary(type, file) {
    return io.readBinary([vars.dstRoot, file]).then(function(content) {
        return when_putObject({
            Key: file,
            ContentType: '' + type + '',
            Body: content
        });
    }).then(function() {
        console.log(' ^ ' + file);
        return file;
    });

}
