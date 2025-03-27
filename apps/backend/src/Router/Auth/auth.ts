import express from 'express'
import verifyToken from '../../Middleware/authmiddleware';
import { googleAuth } from '../../Controller/auth';


export const authRouter = express.Router();

authRouter.post('googleAuth', verifyToken, googleAuth);