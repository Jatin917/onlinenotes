import { HTTP_STATUS } from "../lib/HTTPCODES";
import { prisma } from "../server";
import { supabase } from "../services/supabaseConfig";

export const addPYPSolution = async (req, res) => {
  try {
    const pypId = req.params.pypId;
    const { userId:uploadedById, title } = req.body;
    if (!title && !uploadedById) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "All Fields Required" });
    }
    if (!req.file) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "No file uploaded" });
    }
    const fileName = `${Date.now()}-${title}`;
    // console.log(req.file)
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("onlinenotes")
      .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

    if (error) {
      throw error;
    }

    // Get the public URL of the uploaded file
    const uploadedFile = supabase.storage
      .from("onlinenotes")
      .getPublicUrl(fileName);

    console.log("Uploaded file URL:", uploadedFile.data.publicUrl);

    const response = await prisma.solution.create({
      data: {
        title,
        pypId,
        uploadedById,
        fileUrl: uploadedFile.data.publicUrl,
      },
    });
    res
      .status(200)
      .send({ message: "File uploaded successfully!", url: response.fileUrl });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const getPYPsSolution = async (req, res) =>{
    try {
        const pypId = req.params.pypId;
        const data = await prisma.solution.findMany({where:{pypId}});
        if(!data) return res.status(HTTP_STATUS.NOT_FOUND).json({message:"No Solution Found"});
        return res.status(HTTP_STATUS.OK).json({message:"Founded"});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const upvotePYPSolution = async (req, res) =>{
    try {
        const solutionId = req.params.solutionId;
        const userId = req.body.userId;
        const response = await prisma.upvote.create({data:{userId, entityId:solutionId, entityType:"Solution"}});
        if(!response){
            return res.status(HTTP_STATUS.NOT_MODIFIED).json({message:"not Upvotted"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Upvotted Successfully"});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error});
    }
}

export const downvotePYPSolution = async (req, res) =>{
    try {
        const solutionId = req.params.solutionId;
        const userId = req.body.userId;
        const response = await prisma.upvote.delete({
            where: {
              userId_entityId_entityType: {   // Prisma auto-generates a composite key name
                userId,
                entityId: solutionId,
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