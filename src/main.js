/* jshint node:true */


var server = require('./server')();

var listener = server.listen(8080, function(err) {
    if (err) throw err;

    var host = listener.address().address;
    var port = listener.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});

