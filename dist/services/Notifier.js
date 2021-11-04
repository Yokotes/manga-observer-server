"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var store_1 = __importDefault(require("../store"));
var Notifier = /** @class */ (function () {
    function Notifier(io) {
        this.io = io;
        this.oldState = [];
    }
    Notifier.prototype.watchUpdates = function () {
        var _this = this;
        var state = store_1["default"].getState().manga.mangaList;
        var newManga = [];
        state.forEach(function (manga) {
            var isOld = _this.oldState.find(function (m) { return m.id === manga.id; });
            if (isOld)
                return;
            newManga.push(manga);
        });
        if (newManga.length > 0) {
            this.sendUpdates(newManga);
        }
        this.oldState = state;
    };
    Notifier.prototype.sendUpdates = function (updates) {
        this.io.emit('manga', updates);
    };
    return Notifier;
}());
exports["default"] = Notifier;
