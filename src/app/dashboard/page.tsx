import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { findUserById } from "@/lib/users";
import { BioForm } from "./BioForm";
import { Avatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Dashboard Cá Nhân | AuthPortal",
  description: "Trang bảng điều khiển cá nhân được bảo vệ bởi phiên đăng nhập.",
};

export default async function DashboardPage() {
  // LỚP 2: Page Server Component Guard
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const dbUser = findUserById(session.user.id);
  const user = session.user;

  return (
    <div className="container" style={{ paddingTop: "36px", paddingBottom: "60px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "6px" }}>Bảng điều khiển cá nhân (Dashboard)</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Trang yêu cầu phiên đăng nhập hợp lệ (Lớp 1 Middleware + Lớp 2 Page Guard).
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        {/* User Profile Card */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <Avatar
              name={user.name || "User"}
              role={user.role}
              src={user.image}
              size={48}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{user.name}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{user.email}</div>
              <div style={{ marginTop: "4px" }}>
                <span className={`badge ${user.role === "admin" ? "badge-admin" : "badge-user"}`}>
                  Vai trò: {user.role}
                </span>
              </div>
            </div>
          </div>

          <BioForm initialBio={dbUser?.bio} />
        </div>

        {/* Typed Session Inspector */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={{ fontSize: "1.05rem" }}>Dữ liệu Session (Type-Safe)</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>JSON View</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
            Trường <code>role</code> và <code>id</code> được định nghĩa qua TypeScript declaration:
          </p>

          <pre
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid var(--border-light)",
              padding: "14px",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              color: "#0f172a",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>

      {/* Role banner */}
      <div className="card" style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "4px" }}>
              {user.role === "admin"
                ? "Tài khoản của bạn có quyền Quản trị viên (Admin)"
                : "Tài khoản của bạn là Thành viên thông thường (User)"}
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>
              {user.role === "admin"
                ? "Bạn có thể truy cập khu vực Quản trị để quản lý người dùng và phát hành thông báo."
                : "Nếu bạn cố tình truy cập vào trang /admin, Middleware và Page Guard sẽ chặn và chuyển về /unauthorized."}
            </p>
          </div>

          <div>
            {user.role === "admin" ? (
              <Link href="/admin" className="btn btn-primary btn-sm">
                Đến trang Quản trị Admin
              </Link>
            ) : (
              <Link href="/admin" className="btn btn-secondary btn-sm">
                Thử vào /admin (Kiểm tra 403)
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
