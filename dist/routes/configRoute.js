"use strict";
exports.__esModule = true;
var express_1 = require("express");
var configSlice_1 = require("../slices/configSlice");
var store_1 = require("../store");
var configRoute = (0, express_1.Router)();
configRoute.get('/config', function (req, res) {
    var configs = store_1["default"].getState().config.configs;
    res.send(configs);
});
configRoute.post('/config', function (req, res) {
    var configManager = store_1["default"].getState().configManager.configManager;
    var config = req.body;
    if (!config) {
        res.sendStatus(400);
        return;
    }
    configManager.writeToConfigs(config);
    store_1["default"].dispatch((0, configSlice_1.addConfig)(config));
    res.sendStatus(201);
});
configRoute.put('/config:id', function (req, res) {
    var configId = req.params.id;
    var config = req.body;
    if (!config) {
        res.sendStatus(400);
        return;
    }
    store_1["default"].dispatch((0, configSlice_1.removeConfig)(configId));
    store_1["default"].dispatch((0, configSlice_1.addConfig)(config));
    res.sendStatus(200);
});
configRoute["delete"]('/config/:id', function (req, res) {
    var configId = req.params.id;
    store_1["default"].dispatch((0, configSlice_1.removeConfig)(configId));
    res.sendStatus(200);
});
exports["default"] = configRoute;
