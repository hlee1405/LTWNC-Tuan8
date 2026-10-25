import { ImageResponse } from "next/og";

export const alt = "Kiến Trúc Phòng Thủ Bảo Mật 3 Lớp - ShieldAuth";
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
          background: "linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #0f172a 100%)",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#4338ca",
              color: "#e0e7ff",
              fontSize: "22px",
              fontWeight: 700,
              marginRight: "16px",
              display: "flex",
            }}
          >
            SECURITY WHITE PAPER
          </div>
          <div style={{ fontSize: "24px", color: "#94a3b8", display: "flex" }}>
            ShieldAuth Defense-In-Depth
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "16px",
              display: "flex",
            }}
          >
            Sơ Đồ & Cơ Chế Phòng Thủ 3 Tầng Cho Next.js App Router
          </div>
          <div style={{ fontSize: "26px", color: "#cbd5e1", display: "flex" }}>
            Bảo vệ toàn diện trước tấn công IDOR, Bypass Client Routing và Unauthorized Server Mutation.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#94a3b8",
          }}
        >
          <div style={{ marginRight: "32px", display: "flex" }}>Edge Middleware Guard</div>
          <div style={{ marginRight: "32px", display: "flex" }}>Server Component Guard</div>
          <div style={{ display: "flex" }}>Server Action Mutation Guard</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
