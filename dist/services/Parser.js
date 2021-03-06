"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var puppeteer_1 = __importDefault(require("puppeteer"));
var Parser = /** @class */ (function () {
    function Parser() {
        this.setup();
    }
    Parser.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = [
                            '--no-sandbox',
                            '--disable-setuid-sandbox'
                        ];
                        if (process.env.IS_HEROKU === 'true') {
                            args.push("--proxy-server=" + process.env.PROXY_SERVER);
                        }
                        _a = this;
                        return [4 /*yield*/, puppeteer_1["default"].launch({
                                headless: true,
                                ignoreHTTPSErrors: true,
                                args: args
                            })];
                    case 1:
                        _a.browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 2:
                        _b.page = _c.sent();
                        this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36');
                        this.page.setJavaScriptEnabled(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    Parser.prototype.parse = function (_a) {
        var id = _a.id, url = _a.url, cookies = _a.cookies;
        return __awaiter(this, void 0, void 0, function () {
            var res, i, content, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = {
                            configId: id,
                            data: '',
                            status: 'error'
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < cookies.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.page.setCookie(cookies[i])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.page.goto(url)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.page.content()
                            // eslint-disable-next-line prefer-regex-literals
                        ];
                    case 7:
                        content = _b.sent();
                        // eslint-disable-next-line prefer-regex-literals
                        res.data = JSON.parse(content.replace(new RegExp('<[^>]*>', 'g'), '')).notifications;
                        res.status = 'success';
                        console.log('parsed');
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        res.data = err_1;
                        res.status = 'error';
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, res];
                }
            });
        });
    };
    Parser.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Parser;
}());
exports["default"] = Parser;
