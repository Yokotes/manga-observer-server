"use strict";
exports.__esModule = true;
exports.setConfigManager = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var MongoConfigManager_1 = require("../services/MongoConfigManager");
var configManagerSlice = (0, toolkit_1.createSlice)({
    name: 'configManagerSlice',
    initialState: {
        configManager: new MongoConfigManager_1["default"]()
    },
    reducers: {
        setConfigManager: function (state, _a) {
            var payload = _a.payload;
            state.configManager = payload;
        }
    }
});
exports["default"] = configManagerSlice.reducer;
exports.setConfigManager = configManagerSlice.actions.setConfigManager;
