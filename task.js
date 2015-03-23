/* jshint node: true */

var nopt = require('nopt');
var Q = require('q');

var tasks = nopt({}, {}, process.argv).argv.remain;

Q.longStackSupport = true;

Q.all(
    tasks.map(function(task) {
        return require('./tasks/' + task + '.task');
    })
).done();
