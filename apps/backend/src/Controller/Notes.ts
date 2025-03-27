import { HTTP_STATUS } from "../lib/HTTPCODES";
import { prisma } from "../server"

export const getAllNotes = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): void; new(): any; }; }; }) =>{
    try {
        const notes = await prisma.note.findMany();
        if(!notes){
            return res.status(HTTP_STATUS.NO_CONTENT).json({message:"No Notes Available"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Founded", data:notes});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:(error as Error).message});
    }
} 

export const getNotes = async (req, res) =>{
    try {
        const notesId = req.body.notesId;
        if(!notesId){
            return res.status(HTTP_STATUS.BAD_GATEWAY).json({message:"Notes id is required"});
        }
        const notes = await prisma.note.findFirst({
            where:{
                id:notesId
            }
        });
        if(!notes){
            return res.status(HTTP_STATUS.NO_CONTENT).json({message:"No Notes Available"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"founded", data:notes});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:(error as Error).message});
    }
}

export const addNotes = async (req,res)=>{
    try {
        const {subject, title, year, uploadedById}
    } catch (error) {
        
    }
}