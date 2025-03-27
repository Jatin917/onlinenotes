import admin from '../config/firebase/firebase.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../server.js';
import { HTTP_STATUS } from '../lib/HTTPCODES.js';



export const authMiddleware = (req, res, next) =>{
    try {
        const token =req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
          }
        let decodedata=jwt.verify(token,JWT_SECRET);
        if(!decodedata){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
        }
        req.userid=decodedata?.id;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Forbidden: Invalid token" });
        console.log(error)
    }
}

// This is theMiddleware to verify Firebase token
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if(!decodedToken){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Forbidden: Invalid token" });
  }
};