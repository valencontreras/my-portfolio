"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's your tech stack?",
  "Are you available for work?",
  "Tell me about your projects",
  "What's your experience level?",
  "How can I contact Valentina?",
];

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "Hi there! 👋 I'm Valentina's AI assistant. Ask me anything about her skills, experience, or availability — I'm happy to help!",
};

const generateId = () => Math.random().toString(36).slice(2, 10);

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage]
        .filter((m) => m.id !== "init")
        .map((m) => ({ role: m.role, content: m.content }));

      // Include the initial greeting as part of context
      const historyWithContext = [
        { role: "assistant" as const, content: INITIAL_MESSAGE.content },
        ...conversationHistory,
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyWithContext }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unknown error");
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content:
            "Oops, something went wrong. Please try again in a moment! 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleSuggestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[88px] right-6 z-50 w-[360px] max-h-[520px] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(10,4,30,0.98) 0%, rgba(5,2,18,0.99) 100%)",
              border: "1px solid rgba(168,85,247,0.25)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(59,130,246,0.08) 100%)",
                borderBottom: "1px solid rgba(168,85,247,0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                      boxShadow: "0 0 16px rgba(168,85,247,0.4)",
                    }}
                  >
                    VC
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a041e] block" />
                </div>

                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    Valentina&apos;s Assistant
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 scroll-custom">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Suggested questions — shown only initially */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 mt-2"
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="text-left text-xs px-3 py-2 rounded-xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "rgba(168,85,247,0.06)",
                        border: "1px solid rgba(168,85,247,0.2)",
                        color: "rgba(196,168,255,0.9)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(168,85,247,0.14)";
                        e.currentTarget.style.borderColor =
                          "rgba(168,85,247,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(168,85,247,0.06)";
                        e.currentTarget.style.borderColor =
                          "rgba(168,85,247,0.2)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}
            >
              <div
                className="flex items-end gap-2 rounded-2xl px-4 py-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about Valentina…"
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-transparent resize-none outline-none text-white placeholder-gray-500 text-sm leading-relaxed py-1 max-h-28 overflow-y-auto disabled:opacity-50"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 mb-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                    boxShadow: input.trim()
                      ? "0 0 12px rgba(168,85,247,0.4)"
                      : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-white translate-x-px"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-600 mt-2">
                Powered by Groq · Responses may vary
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Toggle Button ── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={
          isOpen ? "Close chat" : "Open chat with Valentina's AI assistant"
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
          boxShadow:
            "0 8px 32px rgba(168,85,247,0.5), 0 0 0 1px rgba(168,85,247,0.3)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2.5}
                className="w-6 h-6"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ping ring — only when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-purple-500" />
        )}
      </motion.button>
    </>
  );
};

// ── Sub-components ──────────────────────────────────────────────

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
    >
      {/* Assistant avatar dot */}
      {!isUser && (
        <div
          className="w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[9px] font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
          }}
        >
          VC
        </div>
      )}

      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser ? "rounded-tr-sm text-white" : "rounded-tl-sm text-gray-100"
        }`}
        style={
          isUser
            ? {
                background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                boxShadow: "0 4px 12px rgba(168,85,247,0.25)",
              }
            : {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }
        }
      >
        {message.content}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2"
  >
    <div
      className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold text-white"
      style={{
        background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
      }}
    >
      VC
    </div>
    <div
      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-purple-400"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);
