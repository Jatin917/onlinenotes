import { HTTP_STATUS } from "../lib/HTTPCODES";
import { prisma } from "../server"
import { supabase } from "../services/supabaseConfig";

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

export const addNotes = async (req, res) => {
    try {
        const { title, subject, year, userId:uploadedById } = req.body;
        console.log(req.body, uploadedById);
        if (!title || !subject || !year || !uploadedById) {
            return res.status(400).json({ message: "All Fields Required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileName = `${title}-${year}`; // Unique identifier with title & year

        // Check if the file already exists in Supabase
        const existingFile = supabase.storage.from('onlinenotes').getPublicUrl(fileName);

        if (existingFile.data.publicUrl) {
            console.log("File already exists:", existingFile.data.publicUrl);
            
            // Check if the note entry already exists in the database
            const existingNote = await prisma.note.findFirst({
                where: { title, subject, year, uploadedById }
            });

            if (existingNote) {
                return res.status(200).json({ message: "File already exists!", url: existingFile.data.publicUrl });
            }

            // If the file exists but there's no DB entry, create one
            const response = await prisma.note.create({
                data: { title, subject, year, uploadedById, fileUrl: existingFile.data.publicUrl }
            });

            return res.status(200).json({ message: "File already exists, added entry in database!", url: response.fileUrl });
        }

        // If file does not exist, upload it
        const { data, error } = await supabase.storage
            .from('onlinenotes')
            .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

        if (error) throw error;

        // Get the public URL of the uploaded file
        const uploadedFile = supabase.storage.from('onlinenotes').getPublicUrl(fileName);

        console.log("Uploaded file URL:", uploadedFile.data.publicUrl);

        // Save file metadata in the database
        const response = await prisma.note.create({
            data: { title, subject, year, uploadedById, fileUrl: uploadedFile.data.publicUrl }
        });

        res.status(200).json({ message: "File uploaded successfully!", url: response.fileUrl });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



export const upvoteNote = async (req, res) =>{
    try {
        const notesId = req.params.notesId;
        const userId = req.body.userId;
        const response = await prisma.upvote.create({data:{userId, entityId:notesId, entityType:"Notes"}});
        if(!response){
            return res.status(HTTP_STATUS.NOT_MODIFIED).json({message:"not Upvotted"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Upvotted Successfully"});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error});
    }
}
export const downvoteNote = async (req, res) =>{
    try {
        const notesId = req.params.notesId;
        const userId = req.body.userId;
        const response = await prisma.upvote.delete({
            where: {
              userId_entityId_entityType: {   // Prisma auto-generates a composite key name
                userId,
                entityId: notesId,
                entityType: "Notes"
              }
            }
          });
                  if(!response){
            return res.status(HTTP_STATUS.NOT_MODIFIED).json({message:"not Downvotted"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Downvotted Successfully"});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error});
    }
}





