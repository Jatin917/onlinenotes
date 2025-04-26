import { HTTP_STATUS } from "../lib/HTTPCODES";
import { prisma } from "../server";


export const getUserDetails = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await prisma.users.findFirst({where:{id}});
        if(!user){
            return res.status(HTTP_STATUS.NOT_FOUND).json({message:"No user"});
        }
        return res.status(HTTP_STATUS.OK).json({data:user});
    } catch (error) {
        console.log(error);
    }
}