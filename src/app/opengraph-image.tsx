import { ImageResponse } from "next/og";

export const alt = "ShieldAuth - Nền tảng xác thực đa tầng NextAuth & Phân quyền RBAC";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #1a2236 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Shield</span>
            <span style={{ color: "#06b6d4" }}>Auth 2.0</span>
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Kiến Trúc Xác Thực & Phân Quyền Đa Tầng
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#94a3b8",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            NextAuth v5 • RBAC Middleware • Page Server Guard • Server Action Mutation Guard
          </div>
        </div>

        {/* Footer Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: "#cbd5e1",
          }}
        >
          <div
            style={{
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.5)",
              padding: "10px 24px",
              borderRadius: "9999px",
              color: "#a5b4fc",
              fontWeight: 700,
              marginRight: "20px",
              display: "flex",
            }}
          >
            Lớp 1: Middleware Edge Guard
          </div>
          <div
            style={{
              background: "rgba(245,158,11,0.2)",
              border: "1px solid rgba(245,158,11,0.5)",
              padding: "10px 24px",
              borderRadius: "9999px",
              color: "#fcd34d",
              fontWeight: 700,
              marginRight: "20px",
              display: "flex",
            }}
          >
            Lớp 2: Server Component Guard
          </div>
          <div
            style={{
              background: "rgba(16,185,129,0.2)",
              border: "1px solid rgba(16,185,129,0.5)",
              padding: "10px 24px",
              borderRadius: "9999px",
              color: "#6ee7b7",
              fontWeight: 700,
              display: "flex",
            }}
          >
            Lớp 3: Server Action Guard
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
