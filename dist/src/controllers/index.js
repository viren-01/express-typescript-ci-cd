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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const response_handler_1 = require("../helpers/response_handler");
const fs_1 = __importDefault(require("fs"));
class IndexController {
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = ("../index.html");
            res.sendFile(path);
        });
    }
    streamVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const range = req.headers.range;
                if (!range) {
                    return response_handler_1.sendResponse({ err: true, responseCode: 400, msg: 'Requires Range headers' });
                }
                const videoPath = "D:\\VSCODEFILES\\express-typescript-ci-cd\\src\\screen-capture.mp4";
                const videoSize = fs_1.default.statSync(videoPath).size;
                const ChunkSize = 5 * Math.pow(10, 5); //500KB
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + ChunkSize, videoSize - 1);
                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4"
                };
                res.writeHead(206, headers);
                const videoStream = fs_1.default.createReadStream(videoPath, { start, end });
                videoStream.pipe(res);
            }
            catch (error) {
                console.log(error);
                response_handler_1.sendResponse({ err: true, responseCode: 500, msg: '', err_stack: error.stack });
            }
        });
    }
}
exports.IndexController = IndexController;
exports.default = new IndexController();
