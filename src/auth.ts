import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { authConfig } from "./auth.config";
import { verifyCredentials } from "@/lib/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    /**
     * Provider 1: GitHub OAuth
     * Hỗ trợ xác thực SSO qua tài khoản GitHub
     */
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "mock_github_id",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "mock_github_secret",
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user", // Mặc định người dùng đăng nhập OAuth có quyền 'user'
        };
      },
    }),

    /**
     * Provider 2: Email & Mật khẩu (Credentials)
     * Sử dụng Bcrypt để xác thực mật khẩu
     */
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email);
        const password = String(credentials.password);

        const user = verifyCredentials(email, password);
        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatar,
          role: user.role,
        };
      },
    }),
  ],
});
