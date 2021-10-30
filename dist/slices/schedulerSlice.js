"use strict";
exports.__esModule = true;
exports.setScheduler = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var services_1 = require("../services");
var schedulerSlice = (0, toolkit_1.createSlice)({
    name: 'schedulerSlice',
    initialState: {
        scheduler: new services_1.Scheduler()
    },
    reducers: {
        setScheduler: function (state, _a) {
            var payload = _a.payload;
            state.scheduler = payload;
        }
    }
});
exports["default"] = schedulerSlice.reducer;
exports.setScheduler = schedulerSlice.actions.setScheduler;
