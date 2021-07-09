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
const twitterSignIn = require('twittersignin')({
    consumerKey: 'SeefROMzgEPNOyNqWGwQKYW1D',
    consumerSecret: 'IRELRERDqzg5dGrZwZAJWKotjZvbgYZL9cWsn236GFSMzRK7Nq',
    accessToken: '883265045211234305-fdC1VRfzsfuMcHuk5MCJIuV9YrpweOD',
    accessTokenSecret: 'LutiIAaW9Pb2ia9FHWGvRtWtQjmQP1wtSFLD5vZKJ45ZG',
});
let arr = [];
class IndexController {
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const path = ("D:\\VSCODEFILES\\express-typescript-ci-cd\\src" + "/index.html");
            const path = ("/home/ec2-user/express-typescript-app/src" + "/index.html");
            res.sendFile(path);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const path = ("D:\\VSCODEFILES\\express-typescript-ci-cd\\src" + "/login.html");
            const path = ("/home/ec2-user/express-typescript-app/src" + "/login.html");
            res.sendFile(path);
        });
    }
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.token;
            console.log(token);
        });
    }
    handleFBLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.token;
            console.log(token);
        });
    }
    handleTWLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield twitterSignIn.getRequestToken();
            const requestToken = response.oauth_token;
            const requestTokenSecret = response.oauth_token_secret;
            const callbackConfirmed = response.oauth_callback_confirmed;
            arr.push(requestTokenSecret);
            res.redirect(302, `https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`);
        });
    }
    twitterCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the oauth_verifier query parameter
            const oauthVerifier = req.query.oauth_verifier;
            // Get the oauth_token query parameter. 
            // It's the same as the request token from step 1
            const requestToken = req.query.oauth_token;
            // Get the request token secret from whjere we stored it (Step 1)
            const requestTokenSecret = arr[0];
            const response = yield twitterSignIn.getAccessToken(requestToken, requestTokenSecret, oauthVerifier);
            console.log(response);
            res.redirect('/');
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
