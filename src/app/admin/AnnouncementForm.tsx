"use client";

import { useActionState } from "react";
import { createAnnouncementAction, type ActionResult } from "@/app/actions/admin-actions";

export function AnnouncementForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    createAnnouncementAction,
    null
  );

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Phát hành thông báo mới</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
        Thao tác ghi CSDL được bảo vệ bởi <strong>Lớp 3: Server Action Mutation Guard</strong> (chỉ cho phép quyền Admin).
      </p>

      {state?.error && (
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
            color: "var(--danger-color)",
            fontSize: "0.85rem",
            marginBottom: "14px",
          }}
        >
          {state.error}
        </div>
      )}

      {state?.success && (
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--user-bg)",
            border: "1px solid var(--user-border)",
            color: "var(--user-color)",
            fontSize: "0.85rem",
            marginBottom: "14px",
          }}
        >
          {state.message}
        </div>
      )}

      <form action={formAction}>
        <div className="input-group">
          <label className="input-label" htmlFor="title">
            Tiêu đề
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="input-field"
            placeholder="Ví dụ: Kế hoạch bảo trì hệ thống"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="severity">
            Mức độ
          </label>
          <select id="severity" name="severity" className="input-field" defaultValue="info">
            <option value="info">Thông tin (info)</option>
            <option value="warning">Cảnh báo (warning)</option>
            <option value="critical">Khẩn cấp (critical)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="content">
            Nội dung
          </label>
          <textarea
            id="content"
            name="content"
            rows={3}
            required
            className="input-field"
            placeholder="Nội dung thông báo..."
          />
        </div>

        <button type="submit" disabled={isPending} className="btn btn-primary btn-sm">
          {isPending ? "Đang xử lý..." : "Lưu và phát hành"}
        </button>
      </form>
    </div>
  );
}
