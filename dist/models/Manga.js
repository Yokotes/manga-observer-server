"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mangaConfig = new mongoose_1.Schema({
    id: String,
    name: String,
    img: String,
    chapter: String,
    link: String
});
exports["default"] = (0, mongoose_1.model)('Manga', mangaConfig);
