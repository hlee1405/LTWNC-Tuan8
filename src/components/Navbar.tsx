import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth-actions";
import { Avatar } from "@/components/Avatar";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid var(--border-light)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "var(--text-main)",
            letterSpacing: "-0.01em",
          }}
        >
          AuthPortal
        </Link>

        {/* Navigation Links - Clean, no extra icons */}
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            Trang chủ
          </Link>
          <Link
            href="/security"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            Kiến trúc bảo vệ
          </Link>
          <Link
            href="/report"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            Báo cáo
          </Link>
          <Link
            href="/dashboard"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/admin"
            style={{
              fontSize: "0.875rem",
              fontWeight: user?.role === "admin" ? 600 : 500,
              color: user?.role === "admin" ? "var(--admin-color)" : "var(--text-secondary)",
            }}
          >
            Quản trị Admin
          </Link>
        </nav>

        {/* User Auth Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar name={user.name || "User"} role={user.role} src={user.image} size={28} />
              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {user.name}
              </span>
              <span className={`badge ${user.role === "admin" ? "badge-admin" : "badge-user"}`}>
                {user.role}
              </span>
              <form action={logoutAction} style={{ marginLeft: "4px" }}>
                <button type="submit" className="btn btn-secondary btn-sm">
                  Đăng xuất
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
