"use strict";
exports.__esModule = true;
var http_1 = require("http");
var express = require("express");
var socket_io_1 = require("socket.io");
var routes_1 = require("./routes");
var body_parser_1 = require("body-parser");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.server = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server);
        this.setup();
    }
    Server.prototype.setup = function () {
        this.app.get('/', function (_, res) {
            res.send('Manga Observer');
        });
        this.app.use((0, body_parser_1.json)());
        this.app.use('/api', [routes_1.mangaRoute, routes_1.configRoute, routes_1.timerRoute]);
        this.io.on('connection', function (socket) { return console.log('connected', socket.id); });
    };
    Server.prototype.run = function () {
        this.server.listen(process.env.PORT, function () { return console.log('Server is running on PORT', process.env.PORT); });
    };
    Server.prototype.getSockets = function () {
        return this.io;
    };
    return Server;
}());
exports["default"] = Server;
