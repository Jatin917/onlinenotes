import express from 'express'
import { filesRouter } from './Files/files';
import { authRouter } from './Auth/auth';
import { userRouter } from './User/user';

export const router = express.Router()

router.use('/files',filesRouter);
router.use('/auth',authRouter);
router.use('/user', userRouter);