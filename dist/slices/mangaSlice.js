"use strict";
var _a;
exports.__esModule = true;
exports.setParsed = exports.clearMangaList = exports.removeManga = exports.addManga = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var mangaSlice = (0, toolkit_1.createSlice)({
    name: 'mangaSlice',
    initialState: {
        mangaList: [],
        isParsed: false
    },
    reducers: {
        addManga: function (state, _a) {
            var payload = _a.payload;
            state.mangaList.push(payload);
        },
        removeManga: function (state, _a) {
            var payload = _a.payload;
            state.mangaList = state.mangaList.filter(function (manga) { return manga.id !== payload; });
        },
        clearMangaList: function (state) {
            state.mangaList = [];
        },
        setParsed: function (state, _a) {
            var payload = _a.payload;
            state.isParsed = payload;
        }
    }
});
exports["default"] = mangaSlice.reducer;
exports.addManga = (_a = mangaSlice.actions, _a.addManga), exports.removeManga = _a.removeManga, exports.clearMangaList = _a.clearMangaList, exports.setParsed = _a.setParsed;
