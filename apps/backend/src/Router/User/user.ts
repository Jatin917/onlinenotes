import express from 'express'
import { getUserDetails } from '../../Controller/User';

export const userRouter = express.Router();

userRouter.get('/:id', getUserDetails);