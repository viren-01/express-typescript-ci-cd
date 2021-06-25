"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const router = express_1.default.Router();
router.get('/', index_1.default.home);
router.get('/video', index_1.default.streamVideo);
module.exports = router;
