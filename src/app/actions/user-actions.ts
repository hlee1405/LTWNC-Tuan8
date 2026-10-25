"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { updateUserBio } from "@/lib/users";
import type { ActionResult } from "./admin-actions";

/**
 * Server Action cập nhật tiểu sử cá nhân của người dùng đã xác thực
 */
export async function updateUserBioAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();

  // Kiểm tra xác thực ở Server Action
  if (!session?.user?.id) {
    return {
      success: false,
      error: "401 Unauthorized: Bạn cần đăng nhập để cập nhật tiểu sử.",
      layer: "Lớp 3: Server Action Guard",
      timestamp: new Date().toISOString(),
    };
  }

  const bio = (formData.get("bio") as string)?.trim() || "";
  if (bio.length > 300) {
    return {
      success: false,
      error: "Tiểu sử không được vượt quá 300 ký tự.",
    };
  }

  const ok = updateUserBio(session.user.id, bio);
  if (!ok) {
    return {
      success: false,
      error: "Không tìm thấy hồ sơ người dùng trong hệ thống.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return {
    success: true,
    message: "Đã cập nhật tiểu sử tài khoản thành công!",
    layer: "Lớp 3: Server Action Mutation Guard (Thành công)",
    timestamp: new Date().toISOString(),
  };
}
