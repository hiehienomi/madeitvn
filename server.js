var http = require('http');
var path = require('path');
var express = require('express');
var config = require('./config')();
var mongo = require('mongoose');
var fs = require('fs');
var rack = require('asset-rack');
var acceptOverride = require('connect-acceptoverride');


var app = express();
app.configure(function () {
    app.set('port', config.port);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.logger('dev'));


    //app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.urlencoded());


    //session require
    app.use(express.cookieParser('madeit.vn123456789'));

    //session
    app.use(express.session());

    app.use(express.methodOverride());

    //connect-acceptoverride
    app.use(acceptOverride());


    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    //beautiful code
    app.locals.pretty = true;

    //error express
    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    app.use(function (req, res, next) {
        var format = req.param('format');
        if (format) {
            req.headers.accept = 'application/' + format;
        }
        next();
    });


    // dynamically include routes (Controller)
    fs.readdirSync('./app/controllers').forEach(function (file) {
        if (file.substr(-3) == '.js') {
            route = require('./app/controllers/' + file);
            route.controller(app);
        }
    });
});


// assets = new rack.Rack([
//     new rack.Asset({
//         url: '/style.css',
//         filename: __dirname + '/public/stylesheets/style.css'
//     })
// ])

//assets
// app.use(assets)


mongo.connect('mongodb://localhost/test');
http.createServer(app).listen(config.port, function () {
    console.log('Server Stared :' + config.port);
});
