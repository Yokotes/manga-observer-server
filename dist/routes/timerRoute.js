"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var store_1 = __importDefault(require("../store"));
var timerRoute = (0, express_1.Router)();
timerRoute.put('/timer', function (req, res) {
    var scheduler = store_1["default"].getState().scheduler.scheduler;
    var newInterval = req.body.interval;
    if (!newInterval || isNaN(parseInt(newInterval))) {
        res.send({
            message: 'New interval is not a number',
            status: 400
        });
        return;
    }
    scheduler.setInterval(parseInt(newInterval));
    res.sendStatus(200);
});
exports["default"] = timerRoute;
