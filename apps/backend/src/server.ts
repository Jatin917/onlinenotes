import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './Router/router';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // your Next.js frontend origin
    credentials: true,               // this allows cookies to be sent
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

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