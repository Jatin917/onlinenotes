import { HTTP_STATUS } from "../lib/HTTPCODES";
import { prisma } from "../server";
import { supabase } from "../services/supabaseConfig";



export const addPYP = async (req, res) =>{
    try {
        const {title, subject, year, userId:uploadedById} = req.body;
        if(!title && !subject && !year && !uploadedById){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message:"All Fields Required"});
        }
        if (!req.file) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'No file uploaded' });
        }
        const fileName = `${Date.now()}-${title}`;
        // console.log(req.file)
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
        .from('onlinenotes')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

        if (error) {
            throw error;
        }

        // Get the public URL of the uploaded file
        const uploadedFile = supabase.storage.from('onlinenotes').getPublicUrl(fileName);

        console.log("Uploaded file URL:", uploadedFile.data.publicUrl);


        const response = await prisma.note.create({data:{title, subject, year, uploadedById, fileUrl:uploadedFile.data.publicUrl}})
        res.status(200).send({ message: 'File uploaded successfully!', url: response.fileUrl });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error});
    }
}

export const getPYPs = async (req, res) =>{
    try {
        const page = req.query.page || 0;
        const response = await prisma.pYP.findMany({skip:page*10, take:10});
        if(!response) return res.status(HTTP_STATUS.NOT_FOUND).json({message:"Not found"});
        return res.status(HTTP_STATUS.OK).json({message:"Found"});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error})
    }
}

export const getPYP = async (req, res) =>{
    try {
        const id = req.params.PYPId;
        const response = await prisma.pYP.findFirst({id:id});
        if(!response) return res.status(HTTP_STATUS.NOT_FOUND).json({message:"Not found"});
        return res.status(HTTP_STATUS.OK).json({message:"Found"});
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({error})
    }
}
