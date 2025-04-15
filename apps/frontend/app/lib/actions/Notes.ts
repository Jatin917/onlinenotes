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

export const getNoteWithId = async(id:string) =>{
    try {
        const notes=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/getnote/${id}`);
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

export const getPyps = async() =>{
    try {
        const notes=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/getpyps`);
        if(!notes){
            // yha handle krna hain notes nhi mile to like any message through toaster
            console.log("No Pyps Founded");
            throw Error("No Pyps Founded");
        }
        return notes.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getPypWithId = async(id:string) =>{
    try {
        const notes=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/getpyp/${id}`);
        if(!notes){
            // yha handle krna hain notes nhi mile to like any message through toaster
            console.log("No Pyps Founded");
            throw Error("No Pyps Founded");
        }
        return notes.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const addNotes = async (formData:FormData) =>{
    try {
        const cookieStore = cookies()
        const sessionToken = cookieStore.get('next-auth.session-token')
        
        if (!sessionToken) {
          throw new Error('Session token not found')
        }
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/addnotes`,
            formData, // or your payload
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

export const addPyps = async (formData:FormData) =>{
    try {
        const cookieStore = cookies()
        const sessionToken = cookieStore.get('next-auth.session-token')
        
        if (!sessionToken) {
          throw new Error('Session token not found')
        }
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/addpyp`,
            formData, // or your payload
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
