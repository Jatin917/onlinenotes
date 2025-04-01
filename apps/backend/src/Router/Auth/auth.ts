import express from 'express'
import { googleAuth } from '../../Controller/auth';
import { verifyToken } from '../../Middleware/authmiddleware';


export const authRouter = express.Router();

authRouter.post('/google', verifyToken, googleAuth);