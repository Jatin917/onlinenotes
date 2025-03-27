import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './Router/router';
import { PrismaClient } from '@prisma/client';

dotenv.config()
const app = express();
app.use(cors());
const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET  || '';

export const prisma = new PrismaClient();

app.use("/api", router);

app.get("/", (req, res)=>{
    res.send("<h1>Backend in running!!!</h1>")
})
app.listen(PORT, ()=>{
    console.log("SERVER RUNNING ON PORT:", PORT)
})