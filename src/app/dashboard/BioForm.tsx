"use client";

import { useActionState } from "react";
import { updateUserBioAction } from "@/app/actions/user-actions";
import type { ActionResult } from "@/app/actions/admin-actions";

export function BioForm({ initialBio }: { initialBio?: string }) {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    updateUserBioAction,
    null
  );

  return (
    <form action={formAction}>
      <div className="input-group">
        <label className="input-label" htmlFor="bio">
          Tiểu sử (Bio) — Cập nhật qua Server Action
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={initialBio || ""}
          className="input-field"
          placeholder="Giới thiệu ngắn về bạn..."
          style={{ resize: "vertical" }}
        />
      </div>

      {state?.error && (
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
            color: "var(--danger-color)",
            fontSize: "0.85rem",
            marginBottom: "12px",
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
            marginBottom: "12px",
          }}
        >
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending} className="btn btn-secondary btn-sm">
        {isPending ? "Đang lưu..." : "Cập nhật tiểu sử"}
      </button>
    </form>
  );
}
