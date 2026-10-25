import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

export type UserRole = "admin" | "user";

declare module "next-auth" {
  /**
   * Mở rộng đối tượng Session trả về từ `auth()` và `useSession()`
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  /**
   * Mở rộng đối tượng User từ Provider trả về
   */
  interface User {
    id?: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /**
   * Mở rộng cấu trúc JWT token được mã hoá trong session cookie
   */
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
