"use strict";
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var configSlice_1 = require("./slices/configSlice");
var mangaSlice_1 = require("./slices/mangaSlice");
var rootReducer = (0, toolkit_1.combineReducers)({
    manga: mangaSlice_1["default"],
    config: configSlice_1["default"]
});
var store = (0, toolkit_1.configureStore)({
    reducer: rootReducer
});
exports["default"] = store;
