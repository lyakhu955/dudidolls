"use client";
import { useStore } from "@/lib/store";

export default function Toast() {
  const toast = useStore((s) => s.toast);
  return (
    <div className={`toast ${toast.show ? "show" : ""}`}>
      <span className="dot" />
      {toast.message}
    </div>
  );
}
