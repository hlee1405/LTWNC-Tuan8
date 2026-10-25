import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AuthPortal - Hệ Thống Xác Thực NextAuth & Phân Quyền RBAC",
    template: "%s | AuthPortal",
  },
  description:
    "Bài tập Lập trình Web Nâng Cao: Xác thực NextAuth v5, phân quyền 2 vai trò admin và user, kiểm tra bằng Middleware, Server Component và Server Action.",
  authors: [{ name: "Nhóm Đồ Án LTWNC", url: siteUrl }],
  creator: "Nhóm Đồ Án LTWNC",
  publisher: "AuthPortal LTWNC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
