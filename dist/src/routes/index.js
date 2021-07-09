"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const router = express_1.default.Router();
router.get('/', index_1.default.home);
router.get('/login', index_1.default.login);
router.post('/login', index_1.default.verifyToken);
router.post('/fb-login', index_1.default.handleFBLogin);
router.get('/twitter-login', index_1.default.handleTWLogin);
router.get('/twitter', index_1.default.twitterCallback);
router.get('/video', index_1.default.streamVideo);
module.exports = router;
