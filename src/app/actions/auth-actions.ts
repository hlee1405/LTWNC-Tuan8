"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action xử lý đăng nhập bằng Credentials (Email & Mật khẩu)
 */
export async function loginWithCredentialsAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard";

  if (!email || !password) {
    return {
      success: false,
      error: "Vui lòng nhập đầy đủ email và mật khẩu.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return {
      success: true,
      message: "Đăng nhập thành công!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Thông tin xác thực không chính xác! Vui lòng kiểm tra lại email hoặc mật khẩu.",
          };
        default:
          return {
            success: false,
            error: "Lỗi xác thực hệ thống: " + error.message,
          };
      }
    }
    // Redirect trong Next.js là exception điều hướng, cần throw để Next xử lý
    throw error;
  }
}

/**
 * Server Action đăng nhập qua GitHub OAuth
 */
export async function loginWithGithubAction() {
  await signIn("github", { redirectTo: "/dashboard" });
}

/**
 * Server Action đăng xuất hệ thống
 */
export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
