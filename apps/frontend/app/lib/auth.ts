import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const AUTH_OPTIONS = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Required for JWT token encryption
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Store Google user ID in session
      return session;
    },
  },
};

