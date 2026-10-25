import bcrypt from "bcryptjs";
import type { UserRole } from "@/types/next-auth";

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  createdAt: string;
}

// Mật khẩu mẫu:
// admin123 -> $2a$10$wE96Xgq6n2/H7p1k2L4ehe6bHqLqL6c4Q...
// user123  -> $2a$10$...
// Để đảm bảo khởi động tức thì và an toàn, ta sinh hash bằng bcryptjs
const ADMIN_HASH = bcrypt.hashSync("admin123", 10);
const USER_HASH = bcrypt.hashSync("user123", 10);

// Bộ nhớ giả lập (In-memory database) phục vụ kiểm thử và demo
let usersDatabase: SystemUser[] = [
  {
    id: "usr_admin_001",
    name: "Trần Thị B",
    email: "admin@example.com",
    passwordHash: ADMIN_HASH,
    role: "admin",
    avatar: "/avatars/admin.svg",
    bio: "Quản trị viên trưởng hệ thống. Toàn quyền điều hành và quản lý tài nguyên.",
    createdAt: "2026-01-15T08:00:00.000Z",
  },
  {
    id: "usr_user_002",
    name: "Nguyễn Văn A",
    email: "user@example.com",
    passwordHash: USER_HASH,
    role: "user",
    avatar: "/avatars/user.svg",
    bio: "Thành viên tiêu chuẩn. Quyền truy cập các tính năng người dùng cơ bản.",
    createdAt: "2026-02-10T14:30:00.000Z",
  },
];

export interface SystemNotice {
  id: string;
  title: string;
  content: string;
  severity: "info" | "warning" | "critical";
  createdBy: string;
  createdAt: string;
}

let systemNotices: SystemNotice[] = [
  {
    id: "notice_1",
    title: "Triển khai hệ thống phòng vệ đa tầng Next.js",
    content: "Đã kích hoạt Middleware Edge Guard, Page Server Component Guard và Server Action Mutation Guard.",
    severity: "info",
    createdBy: "Trần Thị B",
    createdAt: "2026-10-25T10:00:00.000Z",
  },
  {
    id: "notice_2",
    title: "Chính sách bảo mật mật khẩu phiên bản v2",
    content: "Tất cả mật khẩu lưu trữ đều được hash với thuật toán Bcrypt 10 rounds và gắn vai trò phân quyền chi tiết.",
    severity: "warning",
    createdBy: "Trần Thị B",
    createdAt: "2026-10-25T10:30:00.000Z",
  },
];

/**
 * Tìm người dùng theo Email
 */
export function findUserByEmail(email: string): SystemUser | undefined {
  const normalized = email.toLowerCase().trim();
  return usersDatabase.find((u) => u.email.toLowerCase() === normalized);
}

/**
 * Tìm người dùng theo ID
 */
export function findUserById(id: string): SystemUser | undefined {
  return usersDatabase.find((u) => u.id === id);
}

/**
 * Xác thực thông tin đăng nhập email & mật khẩu
 */
export function verifyCredentials(email: string, passwordPlain: string): SystemUser | null {
  const user = findUserByEmail(email);
  if (!user) return null;

  const isMatch = bcrypt.compareSync(passwordPlain, user.passwordHash);
  if (!isMatch) return null;

  return user;
}

/**
 * Cập nhật Bio người dùng
 */
export function updateUserBio(userId: string, newBio: string): boolean {
  const user = findUserById(userId);
  if (!user) return false;
  user.bio = newBio;
  return true;
}

/**
 * Cập nhật vai trò người dùng (Chỉ Admin)
 */
export function updateUserRole(userId: string, newRole: UserRole): boolean {
  const user = findUserById(userId);
  if (!user) return false;
  user.role = newRole;
  return true;
}

/**
 * Lấy danh sách toàn bộ người dùng
 */
export function getAllUsers(): Omit<SystemUser, "passwordHash">[] {
  return usersDatabase.map(({ passwordHash: _, ...rest }) => rest);
}

/**
 * Lấy danh sách thông báo hệ thống
 */
export function getSystemNotices(): SystemNotice[] {
  return [...systemNotices];
}

/**
 * Tạo thông báo hệ thống mới (Chỉ Admin)
 */
export function addSystemNotice(notice: Omit<SystemNotice, "id" | "createdAt">): SystemNotice {
  const created: SystemNotice = {
    ...notice,
    id: `notice_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  systemNotices.unshift(created);
  return created;
}

/**
 * Xóa thông báo hệ thống (Chỉ Admin)
 */
export function deleteSystemNotice(id: string): boolean {
  const initialLength = systemNotices.length;
  systemNotices = systemNotices.filter((n) => n.id !== id);
  return systemNotices.length < initialLength;
}
