import express from 'express'
import verifyToken from '../../Middleware/authmiddleware';


export const authRouter = express.Router();

authRouter.post('googleAuth', verifyToken, googleAuth);