"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { MessageSquare, X, Send, User, Bot, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";

interface Message {
    id: number;
    text: string;
    sender: "me" | "bot" | "user";
    senderName?: string;
    time: string;
}

export function MiniChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Привет! Я твой ИИ-помощник KazLib. Чем могу помочь?", sender: "bot", time: "21:00" }
    ]);
    const { t } = useLanguage();
    const { user } = useAuth();

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newUserMessage: Message = {
            id: messages.length + 1,
            text: message,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMessage]);
        setMessage("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, history: messages })
            });
            const data = await res.json();
            
            if (data.reply) {
                const botResponse: Message = {
                    id: messages.length + 2,
                    text: data.reply,
                    sender: "bot",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botResponse]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                            height: isMinimized ? "80px" : "500px" 
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[350px] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center text-white">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">KazLib Assistant</h3>
                                    <span className="text-xs text-green-400">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/60"
                                >
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/60"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                                msg.sender === "me" 
                                                ? "bg-accent-primary text-white rounded-br-none" 
                                                : "bg-white/10 text-white rounded-bl-none border border-white/5"
                                            }`}>
                                                <p>{msg.text}</p>
                                                <span className="text-[10px] opacity-40 mt-1 block text-right">{msg.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-white/5 border-t border-white/10">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Спроси что-нибудь..."
                                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-accent-primary/50"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="p-2 rounded-full bg-accent-primary text-white hover:bg-accent-primary/80 transition-colors"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full bg-accent-primary text-white shadow-[0_8px_30px_rgba(59,130,246,0.5)] flex items-center justify-center hover:bg-accent-primary/90 transition-all border border-white/20"
                >
                    <MessageSquare size={28} />
                </motion.button>
            )}
        </div>
    );
}
