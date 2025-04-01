import jwt from 'jsonwebtoken'
import { prisma } from '../server';
import dotenv from 'dotenv'
import { HTTP_STATUS } from '../lib/HTTPCODES';
dotenv.config();


export const googleAuth = async (req, res) => {
    try {
        // console.log(req.user)
        const { name, email, picture } = req.user;
        console.log("user is", req.user);
        let user = await prisma.users.findFirst({ where:{email} });
        if (!user) {
            user = await prisma.users.create({
                data:{
                    name,
                    email,
                    profilePicture:picture
                }
            });
            if (!user) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    message: "User  creation failed",
                });
            }
        }
        console.log("Successfully logged in");
        const token = jwt.sign({
            email: user.email, id: user.id
        }, process.env.JWT_SECRET || '', { expiresIn: "1h" });
        console.log("Successfully logged in");
        res.status(HTTP_STATUS.OK).json({ result: user, token });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error
        });
    }
}