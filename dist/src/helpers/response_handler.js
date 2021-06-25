"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.responseObj = void 0;
const responseObj = (err, responseCode, msg, data) => {
    return {
        err: err,
        responseCode: responseCode,
        msg: msg,
        response: data
    };
};
exports.responseObj = responseObj;
const sendResponse = (responseObj) => {
    try {
        if (responseObj.responseCode != 200) {
            if (!responseObj.response)
                responseObj.response = {};
            if (!responseObj.err_stack)
                responseObj.err_stack = "";
            if (responseObj.response.err_stack) {
                responseObj.err_stack = responseObj.response.err_stack;
                delete responseObj.response.err_stack;
            }
        }
        return responseObj;
    }
    catch (err) {
        console.log(err);
        return ({ msg: 'Internal Server Error' });
    }
};
exports.sendResponse = sendResponse;
