import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllUsers, getSystemNotices } from "@/lib/users";
import { AnnouncementForm } from "./AnnouncementForm";
import { AdminActionTester } from "./AdminActionTester";
import { DeleteNoticeButton } from "./DeleteNoticeButton";
import { UserRoleSwitcher } from "./UserRoleSwitcher";
import { Avatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Quản Trị Hệ Thống (Admin) | AuthPortal",
  description: "Trang quản trị viên bảo vệ bởi 3 lớp: Middleware, Page Guard và Server Action.",
};

export default async function AdminPage() {
  // LỚP 2: Page Server Component Guard
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  const users = getAllUsers();
  const notices = getSystemNotices();
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="container" style={{ paddingTop: "36px", paddingBottom: "60px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "6px" }}>Trung tâm quản trị (Admin Portal)</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Đăng nhập với quyền Quản trị viên: <strong>{session.user.name}</strong> ({session.user.email}).
        </p>
      </div>

      {/* METRICS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div className="card" style={{ padding: "16px" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Tổng người dùng</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "4px" }}>{users.length}</div>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Quản trị viên (Admin)</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "4px", color: "var(--admin-color)" }}>{adminCount}</div>
        </div>

        <div className="card" style={{ padding: "16px" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Số thông báo</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "4px" }}>{notices.length}</div>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE */}
      <section style={{ marginBottom: "36px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>Danh sách người dùng và vai trò (RBAC)</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Tiểu sử</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Avatar name={u.name} role={u.role} src={u.avatar} size={28} />
                      <span style={{ fontWeight: 500 }}>{u.name}</span>
                    </div>
                  </td>
                  <td><code>{u.email}</code></td>
                  <td>
                    <span className={`badge ${u.role === "admin" ? "badge-admin" : "badge-user"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "220px" }}>
                    {u.bio || "Chưa có"}
                  </td>
                  <td>
                    <UserRoleSwitcher userId={u.id} currentRole={u.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NOTICES ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "36px",
        }}
      >
        <AnnouncementForm />

        <div className="card" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Các thông báo hiện có</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {notices.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#f8fafc",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                  <div>
                    <span className="badge badge-neutral" style={{ fontSize: "0.7rem", marginBottom: "4px" }}>
                      {n.severity}
                    </span>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{n.title}</div>
                  </div>
                  <DeleteNoticeButton noticeId={n.id} />
                </div>
                <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  {n.content}
                </p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Người tạo: {n.createdBy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdminActionTester />
    </div>
  );
}
