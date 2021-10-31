"use strict";
/* eslint-disable no-use-before-define */
exports.__esModule = true;
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.interval = 10000;
        this.events = [];
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
        this.timerId = setTimeout(function () {
            _this.events.forEach(function (event) { return event.exec(_this); });
            console.log(_this.interval);
            _this.__loop();
        }, this.interval);
    };
    Scheduler.prototype.stop = function () {
        clearTimeout(this.timerId);
    };
    return Scheduler;
}());
exports["default"] = Scheduler;
