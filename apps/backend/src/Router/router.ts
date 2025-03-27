import express from 'express'
import { filesRouter } from './Files/files';
import { authRouter } from './Auth/auth';

export const router = express.Router()

router.use('/files',filesRouter);
router.use('/auth',authRouter);