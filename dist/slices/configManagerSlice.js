"use strict";
exports.__esModule = true;
exports.setConfigManager = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var services_1 = require("../services");
var configManagerSlice = (0, toolkit_1.createSlice)({
    name: 'configManagerSlice',
    initialState: {
        configManager: new services_1.ConfigManager()
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
