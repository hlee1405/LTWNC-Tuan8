import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "403 Từ Chối Truy Cập | AuthPortal",
  description: "Trang thông báo từ chối truy cập khi tài khoản không đủ quyền.",
};

export default async function UnauthorizedPage() {
  const session = await auth();
  const currentRole = session?.user?.role || "Guest (Khách)";
  const userName = session?.user?.name || "Người dùng";

  return (
    <div
      className="container"
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <span className="badge badge-admin" style={{ marginBottom: "12px" }}>
          Lỗi 403 Forbidden
        </span>

        <h1 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Từ chối quyền truy cập
        </h1>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.6, marginBottom: "20px" }}>
          Tài khoản <strong>{userName}</strong> hiện có vai trò <span className="badge badge-user">{currentRole}</span>.
          Tài nguyên này yêu cầu vai trò tối thiểu là <span className="badge badge-admin">admin</span>.
        </p>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid var(--border-light)",
            padding: "12px",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.825rem",
            color: "var(--text-muted)",
            textAlign: "left",
            marginBottom: "24px",
          }}
        >
          <strong>Cơ chế bảo vệ:</strong> Request tới <code>/admin</code> đã bị Middleware (Lớp 1) và Page Guard (Lớp 2) chặn và điều hướng an toàn.
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="btn btn-primary btn-sm">
            Về Dashboard cá nhân
          </Link>
          <Link href="/login" className="btn btn-secondary btn-sm">
            Đổi sang tài khoản Admin
          </Link>
          <Link href="/" className="btn btn-secondary btn-sm">
            Về Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
