import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Simple Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", name: "Auralis User", email: "user@auralis.ai" };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "auralis_super_secret_key_123",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };