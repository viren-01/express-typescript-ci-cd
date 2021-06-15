import express from 'express';
import * as indexController from '../controllers/index'

const router = express.Router();

router.post('/login', indexController.home)

export = router;





