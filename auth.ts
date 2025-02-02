import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const response = await fetch(
          `https://still-atoll-25843-bcb87143defc.herokuapp.com/login?email=${credentials.email}&password=${credentials.password}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data === "Invalid credentials") {
          throw new Error("Invalid credentials");
        }

        // Ensure all fields from the expected format are returned
        return {
          id: data.uuid,
          name: data.fullName,
          email: data.userEmail,
          phone: data.userPhone,
          gender: data.gender,
          age: data.age,
          role: data.userRole.roleName,
        };
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
      }
    }

  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token if user is logged in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.gender = user.gender;
        token.age = user.age;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session  
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.phone = token.phone as string;
      session.user.gender = token.gender as string;
      session.user.age = token.age as number;
      session.user.role = token.role as string;
      session.user.role = token.role as string;
      return session;
    },
  },
});