"use strict";
/* eslint-disable no-use-before-define */
exports.__esModule = true;
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.events = [];
        this.interval = 60000;
    }
    Scheduler.prototype.addEvent = function (event) {
        this.events.push(event);
    };
    Scheduler.prototype.setInterval = function (val) {
        this.interval = val;
    };
    Scheduler.prototype.getEvents = function () {
        return this.events;
    };
    Scheduler.prototype.start = function () {
        this.__loop();
    };
    Scheduler.prototype.__loop = function () {
        var _this = this;
        this.timerId = setInterval(function () {
            _this.events.forEach(function (event) { return event.exec(_this); });
        }, this.interval);
    };
    Scheduler.prototype.stop = function () {
        clearInterval(this.timerId);
    };
    return Scheduler;
}());
exports["default"] = Scheduler;
