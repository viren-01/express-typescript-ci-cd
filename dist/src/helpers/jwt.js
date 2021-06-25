"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateToken = (data) => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const EXPIRE_TIME = process.env.EXPIRE_TIME;
    const token = jsonwebtoken_1.default.sign({
        data: data
    }, ACCESS_TOKEN, { expiresIn: '10m' });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
        const data = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN);
        return data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.verifyToken = verifyToken;
