import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * LỚP BẢO VỆ 1: MIDDLEWARE EDGE GUARD
 * Thực thi kiểm tra xác thực và phân quyền (RBAC) ngay tại Edge trước khi request
 * được xử lý bởi React Server Components hoặc API routes.
 */
export default NextAuth(authConfig).auth;

export const config = {
  // Áp dụng middleware cho mọi route, ngoại trừ static files, Next.js internal files, và NextAuth API endpoints
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap.xml).*)"],
};
