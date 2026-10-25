import Link from "next/link";
import { auth } from "@/auth";

export async function Footer() {
  const session = await auth();
  const user = session?.user;

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-light)",
        backgroundColor: "#ffffff",
        marginTop: "auto",
        padding: "24px 0",
        width: "100%",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <div>© 2026 AuthPortal</div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/" style={{ color: "var(--text-secondary)" }}>
              Trang chủ
            </Link>
            <Link href="/security" style={{ color: "var(--text-secondary)" }}>
              Kiến trúc bảo mật
            </Link>
            <Link href="/report" style={{ color: "var(--text-secondary)" }}>
              Báo cáo Lighthouse
            </Link>
            {user ? (
              <Link href="/dashboard" style={{ color: "var(--text-secondary)" }}>
                Dashboard
              </Link>
            ) : (
              <Link href="/login" style={{ color: "var(--text-secondary)" }}>
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
