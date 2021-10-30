"use strict";
exports.__esModule = true;
exports.setTimerInterval = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var timerSlice = (0, toolkit_1.createSlice)({
    name: 'timerSlice',
    initialState: {
        interval: 10000
    },
    reducers: {
        setTimerInterval: function (state, _a) {
            var payload = _a.payload;
            state.interval = payload;
        }
    }
});
exports["default"] = timerSlice.reducer;
exports.setTimerInterval = timerSlice.actions.setTimerInterval;
