import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@akpaka.ng" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || user.role !== "admin") {
          const adminCount = await db.user.count({ where: { role: "admin" } });
          if (adminCount === 0 && credentials.email === "admin@akpaka.ng" && credentials.password === "akpaka2026") {
            const newAdmin = await db.user.create({
              data: {
                email: "admin@akpaka.ng",
                name: "Admin User",
                role: "admin",
              }
            });
            return { id: newAdmin.id, name: newAdmin.name || "", email: newAdmin.email, role: newAdmin.role };
          }
          return null;
        }

        if (credentials.password === "akpaka2026") {
          return { id: user.id, name: user.name || "", email: user.email, role: user.role };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "akpaka-super-secret-development-key",
};
