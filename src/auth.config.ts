import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@/types/next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },
  callbacks: {
    /**
     * Lớp bảo vệ 1: Middleware Edge Guard
     * Kiểm tra phiên và vai trò ngay tại tầng Middleware trước khi vào Route Handler / Page.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user?.role as UserRole | undefined) ?? "user";
      const { pathname } = nextUrl;

      // 1. Tuyến đường Quản Trị (/admin): Bắt buộc đăng nhập VÀ có quyền 'admin'
      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
          return false; // Tự động chuyển hướng về trang /login kèm callbackUrl
        }
        if (userRole !== "admin") {
          // Người dùng đã đăng nhập nhưng không đủ quyền -> Chuyển hướng sang trang 403 Unauthorized
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
        return true;
      }

      // 2. Tuyến đường Bảng Điều Khiển (/dashboard): Bắt buộc đăng nhập
      if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
          return false; // Chuyển hướng về /login
        }
        return true;
      }

      // 3. Nếu đã đăng nhập mà truy cập lại trang /login -> chuyển hướng về /dashboard
      if (pathname === "/login" && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Cho phép các trang công khai (/, /security, /report, ...)
      return true;
    },

    /**
     * Callback JWT: Ghi nhớ 'role' và 'id' vào JWT token
     */
    jwt({ token, user }) {
      if (user) {
        token.role = (user.role as UserRole) || "user";
        token.id = user.id;
      }
      return token;
    },

    /**
     * Callback Session: Đưa 'role' và 'id' từ JWT vào đối tượng session.user
     * Giúp Server Components, Server Actions và Client hook truy cập trực tiếp
     */
    session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as UserRole) || "user";
        session.user.id = (token.id as string) || (token.sub as string) || "";
      }
      return session;
    },
  },
  providers: [], // Cấu hình chi tiết các Provider được tiêm vào tại src/auth.ts
} satisfies NextAuthConfig;
