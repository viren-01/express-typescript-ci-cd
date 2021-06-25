import { Request, Response } from "express";
import { generateToken } from "../helpers/jwt";
import { sendResponse } from '../helpers/response_handler';
import fs from 'fs'

export class IndexController {

    public async home(req: Request, res: Response) {
        const path = ("../index.html")
        res.sendFile(path);
    }

    public async streamVideo(req: Request, res: Response) {
    try {
        const range = req.headers.range;
        if (!range) {
            return sendResponse({ err: true, responseCode: 400, msg: 'Requires Range headers' });
        }

        const videoPath = "D:\\VSCODEFILES\\express-typescript-ci-cd\\src\\screen-capture.mp4";
        const videoSize = fs.statSync(videoPath).size;

        const ChunkSize = 5 * 10 ** 5 //500KB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + ChunkSize, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }
        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);

    } catch (error) {
        console.log(error)
        sendResponse({ err: true, responseCode: 500, msg: '', err_stack: error.stack })
    }
}

}
export default new IndexController ();
