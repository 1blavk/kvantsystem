"use client";

import { useState } from "react";
import { Bot, SendHorizontal, Star, X } from "lucide-react";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleClick = () => setOpen(!open);

    const handleSend = () => {
        if (!input.trim()) return;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // Add user message
        setMessages((prev) => [...prev, { time: time, text: input, from: "user" }]);
        setInput("");

        // Auto reply after short delay
        setTimeout(() => {
            setMessages((prev) => [...prev, { time: time, text: "testing mode", from: "bot" }]);
        }, 500);
    };

    return (
        <div className="fixed z-50 bottom-10 right-10 flex flex-col">
            {/* Chat box */}
            {open && (
                <div className="w-[320px] min-h-[450px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
                    {/* Header with Exit button */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold px-4 py-2">
                        <span>Asys-AI Chat</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-1 rounded hover:bg-white/20 transition"
                            aria-label="Close chat"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
                        {messages.length === 0 && (
                            <p className="text-gray-400">Start chatting...</p>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.from === "user"
                                    ? "bg-blue-100 self-end text-blue-900 ml-auto"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                <p className="text-[10px]">
                                    {msg.time}
                                </p>
                                <div className="mt-1">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-200 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                        >
                            <SendHorizontal size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating button */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleClick}
                    className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-2
            font-semibold text-white shadow-lg overflow-hidden border-white/60 border-t-2
            transition-transform duration-300 hover:scale-[1.04] active:scale-[0.94]`}
                >
                    {/* Animated gradient background */}
                    <span
                        className="absolute inset-0 -z-10 animate-gradient
            bg-[length:200%_150%]
            bg-gradient-to-r from-green-600 via-blue-700 to-purple-400"
                    />
                    {/* Glow */}
                    <span className="absolute inset-0 -z-10 blur-xl opacity-40 bg-fuchsia-500" />

                    {/* Border shimmer */}
                    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />
                    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/0 group-hover:ring-white/30 transition" />

                    {/* Icon + label */}
                    <Star
                        className="h-3 w-3 flex-shrink-0 text-white
            transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                        strokeWidth={4}
                        fill="white"
                    />
                    <span className="relative uppercase text-[12px] tracking-wide">
                        asys-ai
                    </span>

                    {/* Sparkle pulse */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Star className="h-3 w-3 text-white/70 animate-ping" strokeWidth={2} />
                    </span>
                </button>
            </div>
        </div>
    );
}
