import express from "express";
import indexController from '../controllers/index';

const router = express.Router();

router.get('/', indexController.home);

router.get('/login', indexController.login);

router.post('/login', indexController.verifyToken);

router.post('/fb-login', indexController.handleFBLogin);

router.get('/twitter-login',indexController.handleTWLogin);

router.get('/twitter', indexController.twitterCallback);

router.get('/video', indexController.streamVideo);

export = router;