"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var server_1 = __importDefault(require("./server"));
var store_1 = __importDefault(require("./store"));
var Parser_1 = __importDefault(require("./services/Parser"));
var utils_1 = require("./utils");
var services_1 = require("./services");
var configSlice_1 = require("./slices/configSlice");
var mongoose_1 = require("mongoose");
(0, dotenv_1.config)();
(0, mongoose_1.connect)(process.env.MONGO_URL);
var globalScheduler = store_1["default"].getState().scheduler.scheduler;
var configManager = store_1["default"].getState().configManager.configManager;
var server = new server_1["default"]();
var parser = new Parser_1["default"]();
var notifier = new services_1.Notifier(server.getSockets());
configManager.readConfigs().then(function (configs) {
    configs.forEach(function (config) {
        store_1["default"].dispatch((0, configSlice_1.addConfig)(config));
    });
});
globalScheduler.addEvent({
    id: 'notifier',
    exec: function () { notifier.watchUpdates(); }
});
globalScheduler.addEvent({
    id: 'main',
    exec: function (scheduler) {
        var configs = store_1["default"].getState().config.configs;
        var events = scheduler.getEvents();
        configs.forEach(function (config) {
            var eventExists = events.find(function (event) { return event.id === config.id; });
            if (eventExists)
                return;
            scheduler.addEvent({
                id: config.id,
                exec: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, utils_1.parseManga)(config, parser, store_1["default"])];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); }
            });
        });
    }
});
globalScheduler.start();
server.run();
