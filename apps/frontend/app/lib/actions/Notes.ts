"use server"

import axios from "axios";
import { cookies } from 'next/headers'

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

export const addNotes = async (file, title, year, subject) =>{
    try {
        const cookieStore = cookies()
        const sessionToken = cookieStore.get('next-auth.session-token')
      
        if (!sessionToken) {
          throw new Error('Session token not found')
        }
        const response = await axios.post(
            'http://localhost:8080/api/files/addnotes',
            { withCredential: true }, // or your payload
            {
              headers: {
                'Content-Type': 'application/json',
                Cookie: `next-auth.session-token=${sessionToken.value}`,
              },
              withCredentials: true,
            }
          )
        if(!response){
            console.log("Notes not uploaded");
            throw Error("Notes not uploaded");
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}