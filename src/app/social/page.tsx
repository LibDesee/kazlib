"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react";
import Link from "next/link";

const CONTACTS = [
    { id: 1, name: "Aizere M.", lastMessage: "Did you finish the math hw?", time: "10:30", avatar: "A", status: "online" },
    { id: 2, name: "Mr. Smith", lastMessage: "Don't forget the deadline.", time: "Yesterday", avatar: "S", status: "offline" },
    { id: 3, name: "Basketball Team", lastMessage: "Practice at 5 PM!", time: "Mon", avatar: "B", status: "online" },
    { id: 4, name: "Study Group", lastMessage: "Let's meet at the library.", time: "Sun", avatar: "SG", status: "offline" },
];

const MOCK_MESSAGES = [
    { id: 1, text: "Hey! Did you check the new schedule?", sender: "them", time: "10:25" },
    { id: 2, text: "Yeah, looks like we have Physics first thing tomorrow.", sender: "me", time: "10:26" },
    { id: 3, text: "Ugh, really? I haven't studied yet.", sender: "them", time: "10:28" },
];

export default function SocialPage() {
    const [selectedContact, setSelectedContact] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        setMessages([...messages, { id: messages.length + 1, text: message, sender: "me", time: "Now" }]);
        setMessage("");
    };

    return (
        <PageLayout>
            <div className="h-[80vh] flex gap-6 max-w-6xl mx-auto">
                {/* Contact List */}
                <div className={`w-full md:w-1/3 flex flex-col gap-4 ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
                    <GlassInput placeholder="Search messages..." className="pl-10 h-10" />

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {CONTACTS.map((contact) => (
                            <div key={contact.id} className="group relative">
                                <GlassCard
                                    className={`p-4 cursor-pointer hover:bg-white/10 flex items-center gap-4 transition-colors ${selectedContact === contact.id ? 'bg-white/10 border-accent-primary/50' : ''}`}
                                    onClick={() => setSelectedContact(contact.id)}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {contact.avatar}
                                        </div>
                                        {contact.status === "online" && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                                            <span className="text-xs text-white/40">{contact.time}</span>
                                        </div>
                                        <p className="text-sm text-white/50 truncate">{contact.lastMessage}</p>
                                    </div>
                                </GlassCard>
                                <Link
                                    href={`/u/${contact.id}`}
                                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-2 text-white/50 hover:text-white transition-opacity bg-black/50 rounded-full backdrop-blur-md z-10"
                                    onClick={(e) => e.stopPropagation()}
                                    title="View Profile"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={`w-full md:w-2/3 flex flex-col ${!selectedContact ? 'hidden md:flex' : 'flex'}`}>
                    <AnimatePresence mode="wait">
                        {selectedContact ? (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 flex flex-col h-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setSelectedContact(null)} className="md:hidden text-white/60 hover:text-white">
                                            ← Back
                                        </button>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                {CONTACTS.find(c => c.id === selectedContact)?.avatar}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{CONTACTS.find(c => c.id === selectedContact)?.name}</h3>
                                                <span className="text-xs text-green-400">Online</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-white/60">
                                        <Phone size={20} className="hover:text-white cursor-pointer" />
                                        <Video size={20} className="hover:text-white cursor-pointer" />
                                        <MoreVertical size={20} className="hover:text-white cursor-pointer" />
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[70%] p-4 rounded-2xl ${msg.sender === "me"
                                                ? "bg-accent-primary text-white rounded-br-none"
                                                : "bg-white/10 text-white rounded-bl-none"
                                                }`}>
                                                <p>{msg.text}</p>
                                                <span className="text-xs opacity-50 mt-1 block text-right">{msg.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-white/5 border-t border-white/10">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-accent-primary/50 transition-colors"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="p-3 rounded-full bg-accent-primary text-white hover:bg-accent-primary/80 transition-colors"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-white/40">
                                <div className="p-6 rounded-full bg-white/5 mb-4">
                                    <Send size={48} className="opacity-50" />
                                </div>
                                <p className="text-lg">Select a contact to start chatting</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageLayout>
    );
}
