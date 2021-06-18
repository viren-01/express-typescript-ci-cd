import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../helpers/response_handler";
import { verifyToken } from '../helpers/jwt';

const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    let responseObj: any = {
    }
    responseObj.err = true;
    responseObj.responseCode = 401;

    if (!authHeader) {
        responseObj.msg = "Authorization header is missing";
        return responseHandler.sendResponse(responseObj);
    }

    const token = authHeader?.split(" ")[1];
    if (token == null) {
        responseObj.msg = "Authorization token is missing"
        return responseHandler.sendResponse(responseObj);
    }
    else {
        try {
            const data: any = verifyToken(token);
            if (!data) {
                responseObj.msg = "Authorization token is invalid";
                return responseHandler.sendResponse(responseObj);
            } else {
                req.user = data;
                req.headers["name"] = data.data.name;
                req.headers["email"] = data.data.email;
                next();
            }
        } catch (err) {
            responseObj.msg =
                err.error.message || "Authorization token verfication failed";
            return responseHandler.sendResponse(responseObj);
        }
    }
}

export default {
    authenticateToken
}