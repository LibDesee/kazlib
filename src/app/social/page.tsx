"use client";

import { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MoreVertical, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { getContacts, getMessages, sendMessage } from "@/app/actions/social";

export default function SocialPage() {
    const { user } = useAuth();
    const [selectedContact, setSelectedContact] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch contacts on load
    useEffect(() => {
        if (!user) return;
        const fetchContacts = async () => {
            try {
                const res = await getContacts(user.id, user.role);
                setContacts(res);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchContacts();
    }, [user]);

    // Fetch and poll messages for selected contact
    useEffect(() => {
        if (!user || !selectedContact) return;

        const fetchChat = async () => {
            const msgs = await getMessages(user.id, selectedContact);
            setMessages(msgs);
        };

        fetchChat();
        const intervalId = setInterval(fetchChat, 3000); // Polling every 3 seconds

        return () => clearInterval(intervalId);
    }, [user, selectedContact]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message.trim() || !selectedContact || !user) return;
        const content = message;
        setMessage("");

        // Optimistic update
        const tempMsg = {
            id: Date.now(),
            senderId: user.id,
            receiverId: selectedContact,
            content,
            createdAt: new Date()
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            await sendMessage(user.id, selectedContact, content);
        } catch (err) {
            console.error("Failed to send message", err);
            // Optionally remove pessimistic fallback here
        }
    };

    const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Find current active user
    const activeContact = contacts.find(c => c.id === selectedContact);

    if (loading) return <PageLayout><div className="flex h-64 items-center justify-center"><div className="animate-spin text-accent-primary"><TrendingUp size={32} /></div></div></PageLayout>;

    return (
        <PageLayout>
            <div className="h-[80vh] flex gap-6 max-w-6xl mx-auto">
                {/* Contact List */}
                <div className={`w-full md:w-1/3 flex flex-col gap-4 ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
                    <GlassInput 
                        placeholder="Search messages..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10" 
                    />

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {filteredContacts.length === 0 && <div className="p-4 text-center text-white/50">No contacts available.</div>}
                        {filteredContacts.map((contact) => (
                            <div key={contact.id} className="group relative">
                                <GlassCard
                                    className={`p-4 cursor-pointer hover:bg-white/10 flex items-center gap-4 transition-colors ${selectedContact === contact.id ? 'bg-white/10 border-accent-primary/50' : ''}`}
                                    onClick={() => setSelectedContact(contact.id)}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                            {contact.avatar || contact.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                                        </div>
                                        <p className="text-sm text-white/50 truncate capitalize">{contact.role.toLowerCase()}</p>
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
                        {selectedContact && activeContact ? (
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
                                            <Link href={`/u/${activeContact.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {activeContact.avatar || activeContact.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">{activeContact.name}</h3>
                                                    <span className="text-xs text-white/60 capitalize">{activeContact.role.toLowerCase()}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-white/60">
                                        <MoreVertical size={20} className="hover:text-white cursor-pointer" />
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="h-full flex items-center justify-center text-white/40 italic">
                                            No messages yet. Send a greeting!
                                        </div>
                                    )}
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[70%] p-4 rounded-2xl ${msg.senderId === user?.id
                                                ? "bg-accent-primary text-white rounded-br-none"
                                                : "bg-white/10 text-white rounded-bl-none"
                                                }`}>
                                                <p>{msg.content}</p>
                                                <span className="text-xs opacity-50 mt-1 block text-right">
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
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
                                            disabled={!message.trim()}
                                            className="p-3 rounded-full bg-accent-primary text-white hover:bg-accent-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
