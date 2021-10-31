"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var configSchema = new mongoose_1.Schema({
    id: String,
    url: String,
    cookies: Array
});
exports["default"] = (0, mongoose_1.model)('Config', configSchema);
