import axios from "axios"

export const authenticateUser = async (session) =>{
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/auth/googleAuth`, {
            headers: {
                "Authorization": `Bearer ${session?.idToken}`,
              },
        });
        if(!response) console.log("Error in Authentication");
        return response;
    } catch (error) {
        console.log(error);
        return (error as Error).message;
    }
}