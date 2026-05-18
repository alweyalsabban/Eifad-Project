"use client";

import { useState } from "react";
import { MessageSquareText, X, CheckCircle2 } from "lucide-react";
import type { Ticket } from "../types";

type Props = {
  open: boolean;
  ticket: Ticket | null;
  onClose: () => void;
  onResolve: (ticketId: number) => void;
  onEscalate: (ticketId: number) => void;
  onReply: (ticketId: number, reply: string) => void;
};

function statusBadge(status: Ticket["status"]) {
  return status === "مفتوح"
    ? "bg-orange-100 text-orange-600"
    : "bg-green-100 text-green-600";
}

export default function TicketDetailsModal({
  open,
  ticket,
  onClose,
  onResolve,
  onEscalate,
  onReply,
}: Props) {
  const [reply, setReply] = useState("");

  if (!open || !ticket) return null;

  const ticketId = ticket.id;

  function handleSendReply() {
    if (!reply.trim()) return;
    onReply(ticketId, reply);
    setReply("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2">
            <MessageSquareText size={18} />
            <h2 className="text-2xl font-bold text-slate-900">
              Support Ticket #{ticketId}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-right">
            <p className="text-sm text-slate-500">المستخدم</p>
            <p className="text-2xl font-semibold text-slate-900">
              {ticket.user}
            </p>
            <p className="mt-1 text-lg text-slate-500">{ticket.email}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">نوع المشكلة</p>
            <p className="text-2xl font-semibold text-slate-900">
              {ticket.type}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">التاريخ</p>
            <p className="text-2xl font-semibold text-slate-900">
              {ticket.date}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">الحالة</p>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusBadge(ticket.status)}`}
            >
              {ticket.status}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-right">
          <h3 className="text-2xl font-bold text-slate-900">
            {ticket.subject}
          </h3>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            {ticket.message}
          </p>
        </div>

        <div className="mt-6 text-right">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            رد
          </label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your response here..."
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-slate-300"
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-5">
          <button
            type="button"
            onClick={handleSendReply}
            className="rounded-xl bg-slate-950 px-4 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            Send رد
          </button>

          <button
            type="button"
            onClick={() => onEscalate(ticketId)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            تصعيد
          </button>

          <button
            type="button"
            onClick={() => onResolve(ticketId)}
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 px-4 py-3 text-base font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            <CheckCircle2 size={18} />
            <span>تعيين كمحلول</span>
          </button>
        </div>
      </div>
    </div>
  );
}
