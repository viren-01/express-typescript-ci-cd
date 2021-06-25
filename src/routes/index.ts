import express from "express";
import indexController from '../controllers/index';

const router = express.Router();

router.get('/', indexController.home);

router.get('/video', indexController.streamVideo);

export = router;