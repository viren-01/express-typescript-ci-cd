import { Controller, Route, Get } from "tsoa";
import { generateToken } from "../helpers/jwt";
import { sendResponse } from '../helpers/response_handler';

@Route("/index")
export class IndexController extends Controller {
    @Get('/')
    public async tobeDeleted() {
        try {
            let resObject = { err: false, responseCode: 200, msg: "WELCOME" }
            return sendResponse(resObject);
        } catch (error) {
            console.log(error)
            return sendResponse({ err: true, responseCode: 500, msg: '', err_stack: error.stack })
        }
    }

    // @Post()
    // public async home(req: Request, res: Response) {
    //     try {
    //         const token = generateToken({
    //             name: req.body.name,
    //             email: req.body.email
    //         })
    //         let resObject = { err: false, responseCode: 200, msg: token }
    //         sendResponse(resObject, res);
    //     } catch (error) {
    //         console.log(error)
    //         sendResponse({ err: true, responseCode: 500, msg: '', err_stack: error.stack }, res)
    //     }
    // }

}
