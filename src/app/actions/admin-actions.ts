"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { addSystemNotice, deleteSystemNotice, updateUserRole } from "@/lib/users";
import type { UserRole } from "@/types/next-auth";

export interface ActionResult<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  layer?: string;
  timestamp?: string;
}

/**
 * LỚP BẢO VỆ 3: SERVER ACTION MUTATION GUARD
 * Mọi thao tác thay đổi dữ liệu nhạy cảm (Tạo thông báo quản trị, đổi vai trò, xóa dữ liệu)
 * đều bắt buộc phải thẩm tra lại session và session.user.role === 'admin'
 * trước khi chạm vào CSDL, ngay cả khi đã vượt qua Middleware và Page.
 */
export async function createAnnouncementAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();

  // Kiểm tra xác thực (Authentication)
  if (!session?.user) {
    return {
      success: false,
      error: "401 Unauthorized: Bạn cần đăng nhập để thực hiện tác vụ này.",
      layer: "Lớp 3: Server Action Mutation Guard",
      timestamp: new Date().toISOString(),
    };
  }

  // Kiểm tra phân quyền (Authorization - RBAC)
  if (session.user.role !== "admin") {
    return {
      success: false,
      error: `403 Forbidden: Quyền truy cập bị từ chối! Vai trò hiện tại của bạn là '${session.user.role}'. Chỉ 'admin' mới được phép phát hành thông báo.`,
      layer: "Lớp 3: Server Action Mutation Guard",
      timestamp: new Date().toISOString(),
    };
  }

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const severity = (formData.get("severity") as "info" | "warning" | "critical") || "info";

  if (!title || !content) {
    return {
      success: false,
      error: "Vui lòng nhập đầy đủ tiêu đề và nội dung thông báo.",
      layer: "Lớp 3: Server Action Validation",
    };
  }

  const newNotice = addSystemNotice({
    title,
    content,
    severity,
    createdBy: session.user.name || "Admin",
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/security");

  return {
    success: true,
    message: `Đã tạo thông báo thành công: "${newNotice.title}"`,
    data: newNotice,
    layer: "Lớp 3: Server Action Execution",
    timestamp: new Date().toISOString(),
  };
}

/**
 * Xóa thông báo hệ thống (Chỉ Admin)
 */
export async function deleteAnnouncementAction(noticeId: string): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      error: "401 Unauthorized: Yêu cầu đăng nhập.",
      layer: "Lớp 3: Server Action Mutation Guard",
    };
  }

  if (session.user.role !== "admin") {
    return {
      success: false,
      error: "403 Forbidden: Chỉ Admin mới có quyền xóa thông báo.",
      layer: "Lớp 3: Server Action Mutation Guard",
    };
  }

  const ok = deleteSystemNotice(noticeId);
  if (!ok) {
    return { success: false, error: "Không tìm thấy thông báo cần xóa." };
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Đã xóa thông báo hệ thống thành công.",
    layer: "Lớp 3: Server Action Execution",
    timestamp: new Date().toISOString(),
  };
}

/**
 * Cập nhật vai trò người dùng (Chỉ Admin)
 */
export async function changeUserRoleAction(
  targetUserId: string,
  newRole: UserRole
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return {
      success: false,
      error: "403 Forbidden: Chỉ Quản Trị Viên mới có quyền phân quyền vai trò.",
      layer: "Lớp 3: Server Action Mutation Guard",
    };
  }

  const ok = updateUserRole(targetUserId, newRole);
  if (!ok) {
    return { success: false, error: "Người dùng không tồn tại." };
  }

  revalidatePath("/admin");

  return {
    success: true,
    message: `Đã chuyển vai trò người dùng thành '${newRole}' thành công.`,
    layer: "Lớp 3: Server Action Execution",
    timestamp: new Date().toISOString(),
  };
}

/**
 * Tác vụ mô phỏng kiểm thử tấn công trực tiếp vào Server Action
 * Cho phép Client gọi action nhạy cảm để kiểm chứng Lớp 3 chặn thành công
 */
export async function simulateDirectAttackAction(): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      error: "[BỊ CHẶN BỞI LỚP 3]: 401 Unauthorized - Không có JWT Token phiên.",
      layer: "Lớp 3: Server Action Mutation Guard",
      timestamp: new Date().toISOString(),
    };
  }

  if (session.user.role !== "admin") {
    return {
      success: false,
      error: `[BỊ CHẶN BỞI LỚP 3]: 403 Forbidden - Client gọi trực tiếp Server Action bằng quyền '${session.user.role}'. Yêu cầu quyền 'admin'.`,
      layer: "Lớp 3: Server Action Mutation Guard",
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    message: "[THÀNH CÔNG]: Bạn đang có vai trò Admin, thao tác được phê chuẩn!",
    layer: "Lớp 3: Server Action Authorized",
    timestamp: new Date().toISOString(),
  };
}
