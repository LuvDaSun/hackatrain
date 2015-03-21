/* jshint node: true */

var when = require('when');
var when_node = require('when/node');
var express = require('express');
var jsdom = require('jsdom');

var config = require('./config');
var args = require('./args');
var vars = require('./vars');

var io = require('./io');
var when_jsdom = when_node.lift(jsdom.env);

module.exports.task = function() {
    
    var app = express();
    
    app.get('/', function (req, res, next) {
    
        when([
            io.find(config.scripts),
            io.find(config.styles),
            io.readText([vars.srcRoot, 'public', 'main.html']).then(when_jsdom)
        ]).spread(function(scripts, styles, window){
    
            var document = window.document;
            var element;
    
            //document.documentElement.setAttribute('ng-app', config.globals.appModule);
    
            element = document.createElement('script');
            element.innerHTML = 'window.globals=' + JSON.stringify(config.globals);
            document.head.appendChild(element);
    
            styles.forEach(function (style) {
                element = document.createElement('link');
                if (style.substr(-5, 5).toLowerCase() === '.less') {
                    element.setAttribute('rel', 'stylesheet/less');
                } else {
                    element.setAttribute('rel', 'stylesheet');
                }
                element.setAttribute('type', 'text/css');
                element.setAttribute('href', style);
                document.head.appendChild(element);
            });
    
            element = document.createElement('script');
            element.innerHTML = 'window.less=' + JSON.stringify({
                errorReporting: 'console',
                logLevel: 0
            });
            document.head.appendChild(element);
    
            element = document.createElement('script');
            element.setAttribute("src", "bower_components/less/dist/less.js");
            document.head.appendChild(element);
    
            scripts.forEach(function (script) {
                element = document.createElement('script');
                element.setAttribute('src', script);
                document.head.appendChild(element);
            });
    
            return jsdom.serializeDocument(document);
        }).done(function (content) {
            res.set('Content-Type', 'text/html');
            res.send(content);
        }, next);
    });
    
    app.use('/public', express.static(vars.srcRoot + '/public'));
    app.use('/bower_components', express.static(vars.srcRoot + '/bower_components'));
    
    return when.promise(function(resolve, reject){
        var server = app.listen(args.port, function () {
            var host = server.address().address;
            var port = server.address().port;
    
            console.log('Debug server listening at http://%s:%s', host, port);
            resolve(server);
        });
    });

};
