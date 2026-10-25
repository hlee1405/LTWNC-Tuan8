import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Đăng Nhập | Cổng Xác Thực Hệ Thống",
  description: "Trang đăng nhập hỗ trợ tài khoản quản trị (admin), người dùng (user) và GitHub OAuth.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div
      className="container"
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      <LoginForm callbackUrl={resolvedParams.callbackUrl} />
    </div>
  );
}
