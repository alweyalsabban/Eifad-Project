// components/chat/ChatWindow.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChatWindow({
  header, // { title: "Sarah - Google Recruiter", subtitle: "Senior Software Engineer", avatar: "S" }
  messages = [], // [{id, side:'me'|'other'|'ai', text, time}]
  aiSuggestion, // { title, text, actionText, onUse } (اختياري)
  onSend, // (text) => void
  placeholder = "اكتب رسالة...",
}) {
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // auto-scroll لآخر الرسائل عند التغيير
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const safeHeader = useMemo(
    () => ({
      title: header?.title ?? "—",
      subtitle: header?.subtitle ?? "",
      avatar: header?.avatar ?? "?",
    }),
    [header],
  );

  function handleSend() {
    const v = text.trim();
    if (!v) return;
    onSend?.(v);
    setText("");
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white mt-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {safeHeader.avatar}
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">
              {safeHeader.title}
            </div>
            <div className="text-xs text-gray-500">{safeHeader.subtitle}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div ref={scrollRef} className="h-[520px] overflow-y-auto px-5 py-6">
        <div className="space-y-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {/* AI Suggestion (اختياري) */}
          {aiSuggestion ? (
            <AiSuggestion
              title={aiSuggestion.title}
              text={aiSuggestion.text}
              actionText={aiSuggestion.actionText}
              onUse={aiSuggestion.onUse}
            />
          ) : null}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSend}
            className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700"
            aria-label="send"
          >
            <FiSend size={18} />
          </button>

          <div className="relative flex-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={placeholder}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="attach"
            >
              <FiPaperclip size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isMe = message.side === "me";
  const isOther = message.side === "other";
  const isAi = message.side === "ai";

  // ai هنا لو تبغى رسائل AI تكون شكل مختلف (حالياً نخليها مثل system إن بغيت)
  if (isAi) {
    return (
      <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">
        <div className="flex items-start justify-between gap-3">
          <p className="leading-relaxed">{message.text}</p>
          {message.time ? (
            <span className="shrink-0 text-[11px] text-green-700/70">
              {message.time}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex", isMe ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isMe && "bg-blue-600 text-white",
          isOther && "bg-gray-100 text-gray-800",
        )}
      >
        <div>{message.text}</div>
        {message.time ? (
          <div
            className={cn(
              "mt-1 text-[11px]",
              isMe ? "text-white/70" : "text-gray-500",
            )}
          >
            {message.time}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AiSuggestion({
  title = "اقتراح الذكاء الاصطناعي",
  text,
  actionText = "استخدم هذا الرد",
  onUse,
}) {
  return (
    <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm text-green-900">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="font-semibold">{title}</div>
          <div className="text-green-800 leading-relaxed">{text}</div>
          {onUse ? (
            <button
              type="button"
              onClick={onUse}
              className="text-xs font-semibold text-green-700 hover:text-green-800"
            >
              {actionText}
            </button>
          ) : (
            <span className="text-xs font-semibold text-green-700">
              {actionText}
            </span>
          )}
        </div>

        {/* أيقونة بسيطة (بدون مكتبات إضافية) */}
        <div className="mt-1 grid h-8 w-8 place-items-center rounded-lg bg-green-100 text-green-700">
          ✨
        </div>
      </div>
    </div>
  );
}
