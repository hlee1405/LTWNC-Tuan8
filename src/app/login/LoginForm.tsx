"use client";

import { useActionState, useState } from "react";
import { loginWithCredentialsAction, type AuthActionResult } from "@/app/actions/auth-actions";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");

  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    loginWithCredentialsAction,
    null
  );

  const fillAdmin = () => {
    setEmail("admin@example.com");
    setPassword("admin123");
  };

  const fillUser = () => {
    setEmail("user@example.com");
    setPassword("user123");
  };

  return (
    <div className="card" style={{ maxWidth: "440px", margin: "0 auto", padding: "32px" }}>
      {/* Title */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "6px" }}>Đăng nhập</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Đăng nhập để kiểm tra phân quyền người dùng và quản trị viên
        </p>
      </div>

      {/* QUICK PREFILL BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
          Điền nhanh tài khoản mẫu:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <button
            type="button"
            onClick={fillAdmin}
            className="btn btn-secondary btn-sm"
            style={{
              padding: "8px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: email === "admin@example.com" ? "1px solid var(--admin-color)" : "1px solid var(--border-light)",
              backgroundColor: email === "admin@example.com" ? "var(--admin-bg)" : "#ffffff",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "0.8125rem", color: "var(--admin-color)" }}>Admin</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>admin@example.com</span>
          </button>

          <button
            type="button"
            onClick={fillUser}
            className="btn btn-secondary btn-sm"
            style={{
              padding: "8px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: email === "user@example.com" ? "1px solid var(--user-color)" : "1px solid var(--border-light)",
              backgroundColor: email === "user@example.com" ? "var(--user-bg)" : "#ffffff",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "0.8125rem", color: "var(--user-color)" }}>User</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>user@example.com</span>
          </button>
        </div>
      </div>

      {/* ERROR NOTICE */}
      {state?.error && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
            color: "var(--danger-color)",
            fontSize: "0.85rem",
            marginBottom: "16px",
          }}
        >
          {state.error}
        </div>
      )}

      {/* CREDENTIALS FORM */}
      <form action={formAction} style={{ marginBottom: "20px" }}>
        <input type="hidden" name="callbackUrl" value={callbackUrl || "/dashboard"} />

        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="admin@example.com"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary"
          style={{ width: "100%", padding: "10px" }}
        >
          {isPending ? "Đang xác thực..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
