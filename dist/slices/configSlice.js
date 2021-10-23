"use strict";
var _a;
exports.__esModule = true;
exports.removeConfig = exports.addConfig = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var configSlice = (0, toolkit_1.createSlice)({
    name: 'configSlice',
    initialState: {
        configs: []
    },
    reducers: {
        addConfig: function (state, _a) {
            var payload = _a.payload;
            state.configs.push(payload);
        },
        removeConfig: function (state, _a) {
            var payload = _a.payload;
            state.configs = state.configs.filter(function (config) { return config.id !== payload; });
        }
    }
});
exports["default"] = configSlice.reducer;
exports.addConfig = (_a = configSlice.actions, _a.addConfig), exports.removeConfig = _a.removeConfig;
