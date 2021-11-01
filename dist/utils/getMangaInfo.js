"use strict";
exports.__esModule = true;
var getMangaInfo = function (_a, config) {
    var manga = _a.manga, chapter = _a.chapter, link = _a.link;
    return {
        id: manga.slug,
        name: manga.rus_name,
        img: "https://" + config.id + "/uploads/cover/" + manga.slug + "/cover/" + manga.cover + "_thumb.jpg",
        chapter: "\u0422\u043E\u043C " + (chapter === null || chapter === void 0 ? void 0 : chapter.volume) + " \u0413\u043B\u0430\u0432\u0430 " + (chapter === null || chapter === void 0 ? void 0 : chapter.number) + " " + (chapter === null || chapter === void 0 ? void 0 : chapter.name),
        link: link
    };
};
exports["default"] = getMangaInfo;
