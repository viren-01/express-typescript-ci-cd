"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = require("../helpers/response_handler");
const jwt_1 = require("../helpers/jwt");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let responseObj = {};
    responseObj.err = true;
    responseObj.responseCode = 401;
    if (!authHeader) {
        responseObj.msg = "Authorization header is missing";
        return response_handler_1.sendResponse(responseObj);
    }
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (token == null) {
        responseObj.msg = "Authorization token is missing";
        return response_handler_1.sendResponse(responseObj);
    }
    else {
        try {
            const data = jwt_1.verifyToken(token);
            if (!data) {
                responseObj.msg = "Authorization token is invalid";
                return response_handler_1.sendResponse(responseObj);
            }
            else {
                req.user = data;
                req.headers["name"] = data.data.name;
                req.headers["email"] = data.data.email;
                next();
            }
        }
        catch (err) {
            responseObj.msg =
                err.error.message || "Authorization token verfication failed";
            return response_handler_1.sendResponse(responseObj);
        }
    }
};
exports.default = {
    authenticateToken
};
