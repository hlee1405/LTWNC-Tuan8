"use client";

import { useTransition } from "react";
import { deleteAnnouncementAction } from "@/app/actions/admin-actions";

export function DeleteNoticeButton({ noticeId }: { noticeId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Bạn có chắc chắn muốn xóa thông báo này?")) return;
    startTransition(async () => {
      await deleteAnnouncementAction(noticeId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="btn btn-danger btn-sm"
      style={{ padding: "3px 8px", fontSize: "0.75rem" }}
    >
      {isPending ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
