import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Trang Chủ | Hệ Thống Xác Thực NextAuth & Phân Quyền RBAC",
  description:
    "Bài tập Lập trình Web Nâng Cao: Tích hợp NextAuth v5, phân quyền 2 vai trò admin và user bằng Middleware, Page Guard và Server Action.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "Hệ Thống Xác Thực NextAuth & Phân Quyền RBAC",
    description:
      "Tích hợp NextAuth v5, xác thực OAuth GitHub và Credentials Bcrypt, phân quyền vai trò admin/user 3 lớp.",
    url: `${siteUrl}/`,
    siteName: "AuthPortal",
    locale: "vi_VN",
    type: "website",
  },
};

export default async function HomePage() {
  const session = await auth();
  const currentUser = session?.user;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "AuthPortal LTWNC",
        description:
          "Hệ thống xác thực và phân quyền RBAC đa tầng tích hợp NextAuth v5 và TypeScript Type-Safe.",
        inLanguage: "vi",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "AuthPortal RBAC",
        applicationCategory: "SecurityApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "VND",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* HEADER SECTION */}
        <section style={{ maxWidth: "780px", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.25rem", marginBottom: "16px", lineHeight: 1.25 }}>
            Xác thực NextAuth v5 và phân quyền người dùng (RBAC)
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
            Hệ thống minh họa cơ chế bảo vệ 3 lớp: Middleware Edge Guard, Page Server Component Guard
            và Server Action Mutation Guard với TypeScript Type-Safe Session.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {currentUser ? (
              <>
                <Link href="/dashboard" className="btn btn-primary">
                  Vào Dashboard cá nhân
                </Link>
                {currentUser.role === "admin" && (
                  <Link href="/admin" className="btn btn-secondary">
                    Vào trang Quản trị Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary">
                  Đăng nhập thử nghiệm
                </Link>
                <Link href="/security" className="btn btn-secondary">
                  Xem kiến trúc 3 lớp bảo vệ
                </Link>
              </>
            )}
          </div>
        </section>

        {/* CURRENT SESSION STATUS */}
        <div className="card" style={{ marginBottom: "32px", padding: "18px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Trạng thái phiên đăng nhập hiện tại
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, marginTop: "2px" }}>
                {currentUser ? (
                  <>
                    Đang đăng nhập: <span>{currentUser.name}</span> ({currentUser.email})
                  </>
                ) : (
                  "Chưa đăng nhập (Khách vãng lai)"
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {currentUser ? (
                <span className={`badge ${currentUser.role === "admin" ? "badge-admin" : "badge-user"}`}>
                  Vai trò: {currentUser.role}
                </span>
              ) : (
                <span className="badge badge-neutral">Vai trò: Guest</span>
              )}
              <Link href="/login" className="btn btn-secondary btn-sm">
                {currentUser ? "Đổi tài khoản" : "Đăng nhập ngay"}
              </Link>
            </div>
          </div>
        </div>

        {/* 3 DEFENSE LAYERS OVERVIEW */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>
            Ba lớp bảo vệ hệ thống
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="badge badge-neutral">Lớp 1</span>
                <code style={{ fontSize: "0.75rem" }}>middleware.ts</code>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Middleware Edge Guard</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Kiểm tra cookie JWT tại Edge trước khi request đến Server. Chuyển hướng về <code>/login</code> nếu chưa đăng nhập hoặc về <code>/unauthorized</code> nếu không phải Admin.
              </p>
            </div>

            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="badge badge-neutral">Lớp 2</span>
                <code style={{ fontSize: "0.75rem" }}>app/admin/page.tsx</code>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Page Server Guard</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Gọi <code>await auth()</code> trực tiếp trong Server Component. Nếu người dùng không có role admin, máy chủ sẽ ngắt render và không trả về dữ liệu nhạy cảm ra HTML.
              </p>
            </div>

            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="badge badge-neutral">Lớp 3</span>
                <code style={{ fontSize: "0.75rem" }}>actions/admin-actions.ts</code>
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Server Action Guard</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Xác thực lại quyền Admin ngay bên trong các hàm Server Action xử lý ghi/xóa dữ liệu, ngăn chặn việc gọi RPC trực tiếp từ client nhằm vượt rào bảo mật.
              </p>
            </div>
          </div>
        </section>

        {/* RBAC MATRIX */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>
            Bảng phân quyền (RBAC Matrix)
          </h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tài nguyên / Chức năng</th>
                  <th>Khách (Guest)</th>
                  <th>Thành viên (User)</th>
                  <th>Quản trị viên (Admin)</th>
                  <th>Cơ chế kiểm soát</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Trang công khai (/, /security, /report)</strong></td>
                  <td>Cho phép</td>
                  <td>Cho phép</td>
                  <td>Cho phép</td>
                  <td>Công khai</td>
                </tr>
                <tr>
                  <td><strong>Bảng điều khiển cá nhân (/dashboard)</strong></td>
                  <td>Chặn (chuyển /login)</td>
                  <td>Cho phép</td>
                  <td>Cho phép</td>
                  <td>Middleware + Page Guard</td>
                </tr>
                <tr>
                  <td><strong>Trang quản trị (/admin)</strong></td>
                  <td>Chặn (chuyển /login)</td>
                  <td>Chặn (lỗi 403)</td>
                  <td>Toàn quyền</td>
                  <td>Middleware + Page Guard</td>
                </tr>
                <tr>
                  <td><strong>Server Action: Cập nhật Bio cá nhân</strong></td>
                  <td>Chặn (401)</td>
                  <td>Cho phép</td>
                  <td>Cho phép</td>
                  <td>Server Action Guard</td>
                </tr>
                <tr>
                  <td><strong>Server Action: Tạo thông báo & Đổi vai trò</strong></td>
                  <td>Chặn (401)</td>
                  <td>Chặn (403)</td>
                  <td>Cho phép</td>
                  <td>Server Action Guard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TEST ACCOUNTS */}
        <section className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>
            Tài khoản kiểm thử
          </h2>
          <p style={{ fontSize: "0.875rem", marginBottom: "16px" }}>
            Mật khẩu đã được mã hóa bằng thuật toán Bcrypt (10 salt rounds) trong CSDL giả lập:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "16px" }}>
            <div style={{ padding: "14px", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", background: "#ffffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Tài khoản Admin</span>
                <span className="badge badge-admin">admin</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Email: <code>admin@example.com</code></div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>Mật khẩu: <code>admin123</code></div>
            </div>

            <div style={{ padding: "14px", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", background: "#ffffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Tài khoản User</span>
                <span className="badge badge-user">user</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Email: <code>user@example.com</code></div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>Mật khẩu: <code>user123</code></div>
            </div>
          </div>

          <Link href="/login" className="btn btn-primary btn-sm">
            Mở trang đăng nhập
          </Link>
        </section>
      </div>
    </>
  );
}
