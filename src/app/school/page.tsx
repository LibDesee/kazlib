"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassTabs } from "@/components/ui/glass-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Utensils, Search, User, Clock } from "lucide-react";

export default function SchoolPage() {
    const [activeTab, setActiveTab] = useState("schedule");
    const [searchQuery, setSearchQuery] = useState("");

    const schedule = [
        { time: "08:00 - 08:45", subject: "Mathematics", room: "305", type: "Core" },
        { time: "08:55 - 09:40", subject: "Physics", room: "Physics Lab", type: "Core" },
        { time: "10:00 - 10:45", subject: "History of Kazakhstan", room: "204", type: "Humanities" },
        { time: "11:05 - 11:50", subject: "Computer Science", room: "IT Lab 1", type: "Elective" },
        { time: "12:00 - 12:45", subject: "Lunch Break", room: "Canteen", type: "Break" },
        { time: "13:00 - 13:45", subject: "English", room: "401", type: "Language" },
    ];

    const menu = [
        { name: "Plov with Beef", price: "800 ₸", type: "Main" },
        { name: "Chicken Soup", price: "450 ₸", type: "Soup" },
        { name: "Caesar Salad", price: "600 ₸", type: "Salad" },
        { name: "Samsas (Cheese/Meat)", price: "250 ₸", type: "Snack" },
        { name: "Berry Compote", price: "150 ₸", type: "Drink" },
    ];

    const users = [
        { name: "Alikhan B.", role: "Student", grade: "11A" },
        { name: "Dana K.", role: "Student", grade: "10B" },
        { name: "Mr. Smith", role: "Teacher", grade: "Physics" },
        { name: "Aizere M.", role: "Student", grade: "11A" },
    ];

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex flex-col items-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">School Ecosystem</h1>

                    <GlassTabs
                        tabs={[
                            { id: "schedule", label: "Schedule" },
                            { id: "canteen", label: "Canteen" },
                            { id: "search", label: "Find Users" }
                        ]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        className="w-full max-w-md"
                    />
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "schedule" && (
                        <motion.div
                            key="schedule"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-xl font-bold text-white mb-2">Today's Classes</h3>
                                {schedule.map((item, i) => (
                                    <GlassCard key={i} className="flex items-center justify-between p-4 group hover:bg-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-full bg-white/5 text-accent-primary">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{item.subject}</h3>
                                                <p className="text-sm text-white/50">{item.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-white font-medium">{item.room}</span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">{item.type}</span>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>

                            <div className="lg:col-span-1 space-y-4">
                                <h3 className="text-xl font-bold text-white mb-2">Events Calendar</h3>
                                <GlassCard className="p-0 overflow-hidden">
                                    <div className="p-4 bg-accent-primary/20 text-center font-bold text-white">October 2026</div>
                                    <div className="p-4 grid grid-cols-7 gap-1 text-center text-sm">
                                        {["M", "T", "W", "T", "F", "S", "S"].map(d => <div key={d} className="text-white/40">{d}</div>)}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                            <div key={d} className={`p-2 rounded-full cursor-pointer hover:bg-white/10 ${d === 14 ? 'bg-accent-secondary text-white' : 'text-white/80'}`}>
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 border-t border-white/10 space-y-3">
                                        <div className="flex gap-3 items-start">
                                            <div className="w-1 h-full bg-accent-secondary rounded-full" />
                                            <div>
                                                <div className="text-sm font-bold text-white">Science Fair</div>
                                                <div className="text-xs text-white/50">14 Oct • 10:00 AM</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <div className="w-1 h-full bg-green-500 rounded-full" />
                                            <div>
                                                <div className="text-sm font-bold text-white">Parent Meeting</div>
                                                <div className="text-xs text-white/50">20 Oct • 18:00 PM</div>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "canteen" && (
                        <motion.div
                            key="canteen"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {menu.map((item, i) => (
                                <GlassCard key={i} className="flex items-center justify-between p-4 border-l-4 border-l-accent-secondary">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-orange-500/20 text-orange-400">
                                            <Utensils size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{item.name}</h3>
                                            <span className="text-xs text-white/40">{item.type}</span>
                                        </div>
                                    </div>
                                    <div className="font-bold text-accent-primary">{item.price}</div>
                                </GlassCard>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "search" && (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <GlassInput
                                placeholder="Search for students or teachers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />

                            <div className="grid grid-cols-1 gap-3">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, i) => (
                                        <GlassCard key={i} className="flex items-center gap-4 p-4 hover:border-accent-primary/50 cursor-pointer">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-lg">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{user.name}</h3>
                                                <p className="text-sm text-white/50">{user.role} • {user.grade}</p>
                                            </div>
                                        </GlassCard>
                                    ))
                                ) : (
                                    <div className="text-center text-white/40 py-8">No users found.</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
