import { NextFunction, Request, Response } from "express";
import { generateToken } from "../helpers/jwt";
import { sendResponse } from '../helpers/response_handler';
import fs from 'fs'

const twitterSignIn = require('twittersignin')({
    consumerKey: 'SeefROMzgEPNOyNqWGwQKYW1D',
    consumerSecret: 'IRELRERDqzg5dGrZwZAJWKotjZvbgYZL9cWsn236GFSMzRK7Nq',
    accessToken: '883265045211234305-fdC1VRfzsfuMcHuk5MCJIuV9YrpweOD',
    accessTokenSecret: 'LutiIAaW9Pb2ia9FHWGvRtWtQjmQP1wtSFLD5vZKJ45ZG',
});

let arr: any = [];
export class IndexController {

    public async home(req: Request, res: Response) {
        const path = ("D:\\VSCODEFILES\\express-typescript-ci-cd\\src" + "/index.html");
        //const path = ("/home/ec2-user/express-typescript-app/src" + "/index.html")
        res.sendFile(path);
    }
    public async login(req: Request, res: Response) {
        const path = ("D:\\VSCODEFILES\\express-typescript-ci-cd\\src" + "/login.html");
        //const path = ("/home/ec2-user/express-typescript-app/src" + "/login.html")
        res.sendFile(path);
    }

    public async verifyToken(req: Request, res: Response) {
        const token = req.body.token;
        console.log(token);
    }
    public async handleFBLogin(req: Request, res: Response) {
        const token = req.body.token;
        console.log(token);
    }


    public async handleTWLogin(req: Request, res: Response) {
        const response = await twitterSignIn.getRequestToken();
        const requestToken = response.oauth_token;
        const requestTokenSecret = response.oauth_token_secret;
        const callbackConfirmed = response.oauth_callback_confirmed;
        arr.push(requestTokenSecret);

        res.redirect(302, `https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`);
    }

    public async twitterCallback(req: Request, res: Response) {
        // Get the oauth_verifier query parameter
        const oauthVerifier = req.query.oauth_verifier;
        // Get the oauth_token query parameter. 
        // It's the same as the request token from step 1
        const requestToken = req.query.oauth_token;
        // Get the request token secret from whjere we stored it (Step 1)
        const requestTokenSecret = arr[0];

        const response = await twitterSignIn.getAccessToken(requestToken, requestTokenSecret, oauthVerifier);
        console.log(response)
        res.redirect('/')
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
export default new IndexController();
