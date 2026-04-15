"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export default function ModalShell({
  open,
  onClose,
  title,
  icon,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
