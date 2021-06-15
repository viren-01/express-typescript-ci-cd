import { Request, Response } from "express";
import { generateToken } from "../helpers/jwt";
import { sendResponse } from '../helpers/response_handler';

const home = async (req: Request, res: Response) => {
    try {
        const token = generateToken({
            name: req.body.name,
            email: req.body.email
        })
        let resObject = { err: false, responseCode: 200, msg: token }
        sendResponse(resObject, res);
    } catch (error) {
        console.log(error)
        sendResponse({ err: true, responseCode: 500, msg: '', err_stack: error.stack }, res)
    }
}

export{
    home
}