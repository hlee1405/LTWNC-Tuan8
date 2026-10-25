"use client";

import { useTransition } from "react";
import { changeUserRoleAction } from "@/app/actions/admin-actions";
import type { UserRole } from "@/types/next-auth";

export function UserRoleSwitcher({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: UserRole;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextRole: UserRole = currentRole === "admin" ? "user" : "admin";
    startTransition(async () => {
      await changeUserRoleAction(userId, nextRole);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="btn btn-secondary btn-sm"
      style={{ fontSize: "0.75rem", padding: "3px 8px" }}
    >
      {isPending ? "Đang đổi..." : `Đổi sang ${currentRole === "admin" ? "user" : "admin"}`}
    </button>
  );
}
