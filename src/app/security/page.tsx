import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Kiến Trúc Bảo Mật 3 Lớp | NextAuth RBAC",
  description:
    "Phân tích cơ chế bảo mật 3 lớp trong Next.js App Router: Middleware Edge Guard, Page Server Component Guard và Server Action Mutation Guard.",
  alternates: {
    canonical: `${siteUrl}/security`,
  },
  openGraph: {
    title: "Kiến Trúc Bảo Mật 3 Lớp | NextAuth RBAC",
    description:
      "Tài liệu kỹ thuật giải thích cách bảo vệ hệ thống Next.js trước các lỗ hổng bypass routing và giả mạo Server Action.",
    url: `${siteUrl}/security`,
    siteName: "AuthPortal",
    locale: "vi_VN",
    type: "article",
  },
};

export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/security#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang Chủ",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Kiến Trúc Bảo Mật",
            item: `${siteUrl}/security`,
          },
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${siteUrl}/security#article`,
        headline: "Kiến Trúc Bảo Mật 3 Lớp & Phân Quyền RBAC trong Next.js App Router",
        description:
          "Tài liệu phân tích mô hình bảo vệ 3 lớp: Middleware Edge Guard, Page Server Component Guard và Server Action Mutation Guard.",
        url: `${siteUrl}/security`,
        datePublished: "2026-10-25T08:00:00.000Z",
        inLanguage: "vi",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container" style={{ paddingTop: "36px", paddingBottom: "60px" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "var(--text-secondary)" }}>Trang chủ</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>Kiến trúc bảo vệ</span>
        </nav>

        <header style={{ maxWidth: "780px", marginBottom: "36px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
            Kiến trúc bảo vệ 3 lớp trong Next.js App Router
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Để bảo vệ ứng dụng toàn diện, hệ thống không chỉ dựa vào Middleware mà kết hợp 3 lớp kiểm tra độc lập nhằm ngăn chặn bypass routing và can thiệp dữ liệu trái phép.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
          {/* Lớp 1 */}
          <section className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="badge badge-neutral">Lớp 1</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Edge Runtime</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>
              Middleware Edge Guard (Chặn tại Edge)
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Thực thi ngay tại tầng Edge trước khi request đến Server Component hoặc API routes.
              Giải mã Cookie JWT và kiểm tra quyền truy cập:
            </p>
            <ul style={{ fontSize: "0.875rem", color: "var(--text-secondary)", listStyle: "disc", paddingLeft: "20px", marginBottom: "16px" }}>
              <li>Nếu chưa đăng nhập: chuyển hướng về <code>/login?callbackUrl=...</code></li>
              <li>Nếu đăng nhập với quyền <code>user</code> nhưng vào <code>/admin/*</code>: chuyển hướng ngay về trang lỗi <code>/unauthorized</code>.</li>
              <li>Giảm tải cho server, ngăn chặn việc render tài nguyên cho các request không hợp lệ.</li>
            </ul>
            <pre style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.8125rem", overflowX: "auto" }}>
{`// src/auth.config.ts
authorized({ auth, request: { nextUrl } }) {
  const isLoggedIn = !!auth?.user;
  const role = auth?.user?.role;
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) return false;
    if (role !== "admin") return Response.redirect(new URL("/unauthorized", nextUrl));
    return true;
  }
  return true;
}`}
            </pre>
          </section>

          {/* Lớp 2 */}
          <section className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="badge badge-neutral">Lớp 2</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Server Component Rendering</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>
              Page Server Component Guard (Chặn tại Trang)
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Gọi <code>await auth()</code> trực tiếp trong Server Component trước khi trả về HTML:
            </p>
            <ul style={{ fontSize: "0.875rem", color: "var(--text-secondary)", listStyle: "disc", paddingLeft: "20px", marginBottom: "16px" }}>
              <li>Bảo vệ chống tình huống sơ hở trong cấu hình matcher của Middleware.</li>
              <li>Đảm bảo mã HTML và dữ liệu quản trị nhạy cảm không bao giờ được tạo ra nếu phiên không hợp lệ.</li>
            </ul>
            <pre style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.8125rem", overflowX: "auto" }}>
{`// src/app/admin/page.tsx
export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/unauthorized");
  return <AdminView data={data} />;
}`}
            </pre>
          </section>

          {/* Lớp 3 */}
          <section className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="badge badge-neutral">Lớp 3</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Server Action RPC</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>
              Server Action Mutation Guard (Chặn tại thao tác CSDL)
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Chốt chặn cuối cùng bảo vệ trực tiếp tầng dữ liệu:
            </p>
            <ul style={{ fontSize: "0.875rem", color: "var(--text-secondary)", listStyle: "disc", paddingLeft: "20px", marginBottom: "16px" }}>
              <li>Server Actions là các RPC endpoint có thể bị gọi độc lập qua HTTP POST.</li>
              <li>Mỗi action ghi/sửa dữ liệu phải tự thẩm tra <code>session.user.role === &apos;admin&apos;</code>.</li>
              <li>Nếu không đủ quyền, trả về mã lỗi 403 Forbidden và từ chối cập nhật CSDL.</li>
            </ul>
            <pre style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.8125rem", overflowX: "auto" }}>
{`// src/app/actions/admin-actions.ts
"use server";
export async function createAnnouncementAction(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, error: "403 Forbidden: Thao tác chỉ dành cho Admin." };
  }
  // Ghi dữ liệu vào CSDL an toàn...
  return { success: true };
}`}
            </pre>
          </section>
        </div>

        {/* TypeScript Safety */}
        <section className="card" style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
            Mở rộng kiểu dữ liệu TypeScript (Zero any)
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
            File <code>src/types/next-auth.d.ts</code> định nghĩa kiểu rõ ràng cho <code>Session</code>, <code>User</code> và <code>JWT</code>:
          </p>
          <pre style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.8125rem", overflowX: "auto" }}>
{`export type UserRole = "admin" | "user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}`}
          </pre>
        </section>
      </div>
    </>
  );
}
