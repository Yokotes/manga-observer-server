"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs = require("fs");
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        this.path = (0, path_1.resolve)(__dirname, '..', '..', 'data', 'configs.json');
    }
    ConfigManager.prototype.readConfigs = function () {
        var rawData = fs.readFileSync(this.path).toString();
        var configs = JSON.parse(rawData);
        return configs;
    };
    ConfigManager.prototype.writeToConfigs = function (config) {
        var configs = this.readConfigs();
        configs.push(config);
        fs.writeFileSync(this.path, JSON.stringify(configs));
    };
    return ConfigManager;
}());
exports["default"] = ConfigManager;
