"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var configManagerSlice_1 = __importDefault(require("./slices/configManagerSlice"));
var configSlice_1 = __importDefault(require("./slices/configSlice"));
var mangaSlice_1 = __importDefault(require("./slices/mangaSlice"));
var schedulerSlice_1 = __importDefault(require("./slices/schedulerSlice"));
var rootReducer = (0, toolkit_1.combineReducers)({
    manga: mangaSlice_1["default"],
    config: configSlice_1["default"],
    scheduler: schedulerSlice_1["default"],
    configManager: configManagerSlice_1["default"]
});
var customMiddleware = (0, toolkit_1.getDefaultMiddleware)({
    serializableCheck: false
});
var store = (0, toolkit_1.configureStore)({
    reducer: rootReducer,
    middleware: customMiddleware
});
exports["default"] = store;
