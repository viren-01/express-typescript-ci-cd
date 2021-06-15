import express from 'express';
import * as userController from '../controllers/users';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/api/users',auth.authenticateToken, userController.getUsers)

export = router;




