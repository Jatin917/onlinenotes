import { HTTP_STATUS } from "../lib/HTTPCODES";
import { prisma } from "../server"
import { supabase } from "../services/supabaseConfig";

export const getAllNotes = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): void; new(): any; }; }; }) =>{
    try {
        const page = req.query.page || 0;
        // skip-> itne numbers of records ko skip krna hain and take-> return this much of records
        const notes = await prisma.note.findMany({skip:page*10, take:10, include:{uploadedBy:{select:{id:true, name:true, email:true, profilePicture:true}}}});
        const updatedNotes = await Promise.all(
            notes.map(async (note) => {
              const id = note.id;
              const response = await prisma.upvote.findMany({
                where: { entityId: String(id) }
              });
              console.log("upvoted function ", response, id)
              const upvotedBy = response.map((res) => ({
                userId: res.userId
              }));              
              return {
                ...note,
                upvotedBy: upvotedBy,
                // upvotedCount: response.length,
              };
            })
        )
        
        if(!updatedNotes){
            return res.status(HTTP_STATUS.NO_CONTENT).json({message:"No Notes Available"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Founded", data:updatedNotes});
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
        console.log("req.body", req.body, uploadedById);
        if (!title || !subject || !year || !uploadedById) {
            return res.status(400).json({ message: "All Fields Required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileName = `${title}-${year}`; // Unique identifier with title & year

        // Check if the file already exists in Supabase
        const existingNote = await prisma.note.findFirst({
            where: { title, subject, year, uploadedById }
        });

        if (existingNote) {
            return res.status(200).json({ message: "File with this name already exists!" });
        }
        // If file does not exist, upload it
        // console.log("file is ", req.file);
        const { data, error } = await supabase.storage
            .from('notesonline')
            .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

        if (error) throw error;

        // Get the public URL of the uploaded file
        const uploadedFile = supabase.storage.from('notesonline').getPublicUrl(fileName);
        // const downloadableLink = supabase.storage.from('notesonline').getDownloadUrl(fileName);

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
        console.log("in upvote notes")
        const notesId = req.params.notesId;
        const userId = req.body.userId;
        console.log("notesid ", notesId, userId)
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


export const deleteNote = async (req, res) =>{
    try {
        const id = req.params.id;
        const response = await prisma.note.delete({where:{id}});
        if(!response){
            return res.status(HTTP_STATUS.NOT_IMPLEMENTED).json({message:"Failed to Delete"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Deleted"});
    } catch (error) {
        console.log(error)
    }
}


