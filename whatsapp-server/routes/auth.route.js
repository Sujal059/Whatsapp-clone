import express from 'express';
import trimRequest from 'trim-request';
import { login, logout, register, resfreshToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/register').post(trimRequest.all ,register);
router.route('/login').post(trimRequest.all ,login);
router.route('/logout').get(trimRequest.all ,logout);
router.route('/refreshToken').post(trimRequest.all ,resfreshToken);




export default router;