// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    gender?: string | null;
    age?: number | null;
    role: string; // Add the role field
  }

  interface Session {
    user: User; // Ensure the session user matches the extended User type
  }

  interface JWT {
    role?: string; // Add role to the JWT interface if needed
  }
}