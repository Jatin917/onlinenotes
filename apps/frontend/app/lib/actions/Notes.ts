import axios from "axios";

export const getNotes = async() =>{
    try {
        const notes=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/getnotes`);
        if(!notes){
            // yha handle krna hain notes nhi mile to like any message through toaster
            console.log("No Notes Founded");
            throw Error("No notes Founded");
        }
        return notes.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}