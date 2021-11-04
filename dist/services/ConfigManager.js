"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var path_1 = require("path");
var fs = __importStar(require("fs"));
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
