import admin from '../services/firebaseConfig'
// import jwt from 'jsonwebtoken'
import { JWT_SECRET, prisma } from '../server.js';
import { HTTP_STATUS } from '../lib/HTTPCODES.js';
import { OAuth2Client } from "google-auth-library";
import { decode } from 'next-auth/jwt';


export const authMiddleware = async (req, res, next) =>{
    try {
      const token = req.cookies['next-auth.session-token']; 
      console.log("token in authmiddleware ", token) 
      // const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
          }
        const decoded = await decode({
          token,
          secret: process.env.JWT_SECRET
        });
        const email = decoded?.email;
        console.log("email of user is ", email)
        const user = await prisma.users.findFirst({where:{
          email
        }});
        console.log("req.body authMiddleware", req.body)
        req.body.userId=user?.id;
        // console.log(req.body);
        next();
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Forbidden: Invalid token" });
        console.log(error)
    }
}

const CLIENT_ID = "1052119925438-k79ivnl77nsekq79c36l4hti86tm3afc.apps.googleusercontent.com"; // Replace with your Google Client ID
const client = new OAuth2Client();

// This is theMiddleware to verify Firebase token
export const verifyToken = async (req, res, next) => {
  console.log('Cookies:', req.cookies);  
  console.log("inside the verify token ", req.headers);
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const decodedToken = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
  });
    console.log("verification done");
    if(!decodedToken){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
    }
    console.log("decoded token", decodedToken);
    const payload = decodedToken.getPayload(); // Decoded token
    req.user = payload; // Contains user info like email, name, and picture
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Forbidden: Invalid token" });
  }
};