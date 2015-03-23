/* jshint node: true */

var Q = require('q');
var jsdom = require('jsdom');

var config = require('./config');
var args = require('./args');
var vars = require('./vars');

var io = require('./io');
var when_jsdom = Q.nfbind(jsdom.env);


module.exports = io.readText([vars.srcRoot, 'public', 'main.html']).then(when_jsdom).then(function(window) {
    var document = window.document;
    var element;

    //document.documentElement.setAttribute('ng-app', config.globals.appModule);

    element = document.createElement('script');
    element.innerHTML = 'window.globals=' + JSON.stringify(config.globals);
    document.head.appendChild(element);

    element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', "main.css");
    document.head.appendChild(element);

    element = document.createElement('script');
    element.setAttribute("src", "main.js");
    document.head.appendChild(element);

    trimNode(document);

    return jsdom.serializeDocument(document);
}).then(function(content) {
    return io.writeText([vars.dstRoot, 'index.html'], content);
});

function trimNode(node) {
    if (node.nodeType === 3) {
        node.data = node.data
            .replace(/(^\s+|\s+$)/gi, ' ')
            .replace(/\s+/gi, ' ');
    }

    if (node.firstChild) trimNode(node.firstChild);
    if (node.nextSibling) trimNode(node.nextSibling);
}
