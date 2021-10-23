"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mangaSlice_1 = require("../slices/mangaSlice");
var store_1 = require("../store");
var mangaRoute = (0, express_1.Router)();
mangaRoute.get('/manga', function (req, res) {
    var manga = store_1["default"].getState().manga.mangaList;
    res.send(manga);
});
mangaRoute["delete"]('/manga/:id', function (req, res) {
    var mangaId = req.params.id;
    store_1["default"].dispatch((0, mangaSlice_1.removeManga)(mangaId));
    res.sendStatus(200);
});
exports["default"] = mangaRoute;
