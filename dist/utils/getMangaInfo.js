"use strict";
exports.__esModule = true;
var getMangaInfo = function (_a, config) {
    var manga = _a.manga, ch = _a.chapter, l = _a.link, chaptersCount = _a.chaptersCount;
    var chapter = chaptersCount ? chaptersCount + " \u0433\u043B\u0430\u0432\u044B" : "\u0422\u043E\u043C " + (ch === null || ch === void 0 ? void 0 : ch.volume) + " \u0413\u043B\u0430\u0432\u0430 " + (ch === null || ch === void 0 ? void 0 : ch.number) + " " + (ch === null || ch === void 0 ? void 0 : ch.name);
    var link = chaptersCount ? "https://" + config.id + l : l;
    return {
        id: manga.slug,
        name: manga.rus_name,
        img: "https://" + config.id + "/uploads/cover/" + manga.slug + "/cover/" + manga.cover + "_thumb.jpg",
        chapter: chapter,
        link: link
    };
};
exports["default"] = getMangaInfo;
