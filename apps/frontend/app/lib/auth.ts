import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

export const AUTH_OPTIONS = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // for signing
  session: {
    strategy: 'jwt',
  },
  jwt: {
    encryption: false,
    secret: process.env.NEXTAUTH_SECRET,
  },

// cookies: {
//   sessionToken: {
//     name: `next-auth.session-token`,
//     options: {
//       httpOnly: true,
//       sameSite: 'None',
//       // domain:"localhost",
//       // secure: true,
//     },
//   },
// },
  callbacks: {
    async jwt({ token, account }) {
      console.log("jwt callback 🔥");
      console.log("ACCOUNT: ", JSON.stringify(account, null, 2)); 
      console.log("TOKEN BEFORE:", JSON.stringify(token, null, 2)); 
    
      if (account) {
        token.idToken = account.id_token ?? "NO_ID_TOKEN_FOUND";
      }
    
      console.log("TOKEN AFTER:", JSON.stringify(token, null, 2)); 
    
      return token;
    },    
    async session({ session, token }) {
      console.log("session is called ", token, session)
      // if(!token) return null;
      session.idToken = token.idToken; // Pass it to session
      return session;
    },
    async signIn({ account, profile }) {
      console.log("signin is called ", account, profile)
      if (!account || !profile) return false;
    
      try {
        // Send user data to the backend to verify the token
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
          // {  withCredentials: true, },
          {},  // Empty object for body (if no body is needed)
          {
            headers: { 
              Authorization: `Bearer ${account.id_token}`
            }
          }
        );
        console.log("sign in ", res)
        // Check the response from the backend
        if (res.status === 200 && res.data) {
          const userDetails = res.data; 
          // Return the user data and continue the session creation
          return {
            status: "success",
            user: userDetails,  // Add user details to the session object
          };
        } else {
          return false; // Sign-in failed if no data or bad response
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // If there's an error, return false to prevent sign-in
      }
    }    
  },
};

