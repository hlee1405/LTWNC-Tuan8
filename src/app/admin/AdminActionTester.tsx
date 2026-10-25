"use client";

import { useState } from "react";
import { simulateDirectAttackAction, type ActionResult } from "@/app/actions/admin-actions";

export function AdminActionTester() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const res = await simulateDirectAttackAction();
      setResult(res);
    } catch (err: unknown) {
      setResult({
        success: false,
        error: "Lỗi: " + (err instanceof Error ? err.message : String(err)),
        layer: "Client RPC Trigger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>
        Kiểm thử trực tiếp Server Action (Lớp 3)
      </h3>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
        Thử kích hoạt một Server Action yêu cầu quyền Admin độc lập qua RPC:
      </p>

      <button
        onClick={handleTest}
        disabled={loading}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: "14px" }}
      >
        {loading ? "Đang gửi RPC request..." : "Gọi Server Action (RPC Call)"}
      </button>

      {result && (
        <div
          style={{
            padding: "12px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: result.success ? "var(--user-bg)" : "var(--danger-bg)",
            border: result.success ? "1px solid var(--user-border)" : "1px solid var(--danger-border)",
            color: result.success ? "var(--user-color)" : "var(--danger-color)",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            {result.success ? "Phê chuẩn (Authorized)" : "Từ chối (Forbidden)"}
          </div>
          <div>{result.message || result.error}</div>
        </div>
      )}
    </div>
  );
}
