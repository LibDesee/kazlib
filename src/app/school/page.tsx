"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassTabs } from "@/components/ui/glass-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Utensils, Search, Clock, TrendingUp } from "lucide-react";
import { USERS } from "@/lib/data/users";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { getMenu, getCalendarEvents, getScheduleByClass, getScheduleByTeacher } from "@/app/actions/school";

export default function SchoolPage() {
    const [activeTab, setActiveTab] = useState("schedule");
    const [searchQuery, setSearchQuery] = useState("");
    const { t, language } = useLanguage();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [scheduleSlots, setScheduleSlots] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch schedule based on role
                if (user?.role === "TEACHER") {
                    setScheduleSlots(await getScheduleByTeacher(user.id));
                } else {
                    // Default to '11A' for Student demo 
                    const className = user?.grade || '11A';
                    setScheduleSlots(await getScheduleByClass(className));
                }

                // Fetch other modules
                setMenuItems(await getMenu());
                setEvents(await getCalendarEvents());
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        loadData();
    }, [user]);

    const getSlotTiming = (order: number) => {
        const timings: Record<number, string> = {
            1: "08:00 - 08:45",
            2: "08:55 - 09:40",
            3: "09:50 - 10:35",
            4: "10:45 - 11:30",
            5: "12:10 - 12:55", // After 40m lunch
            6: "13:05 - 13:50",
            7: "14:00 - 14:45",
            8: "14:55 - 15:40"
        };
        return timings[order] || "00:00 - 00:00";
    };

    const today = new Date().getDay();
    const defaultDay = (today === 0 || today === 6) ? 1 : today;
    const [selectedDay, setSelectedDay] = useState(defaultDay);

    const activeSchedule = scheduleSlots.filter(s => s.dayOfWeek === selectedDay).sort((a, b) => a.slotOrder - b.slotOrder);

    const days = [
        { id: 1, name: language === 'ru' ? 'Пн' : 'Mon' },
        { id: 2, name: language === 'ru' ? 'Вт' : 'Tue' },
        { id: 3, name: language === 'ru' ? 'Ср' : 'Wed' },
        { id: 4, name: language === 'ru' ? 'Чт' : 'Thu' },
        { id: 5, name: language === 'ru' ? 'Пт' : 'Fri' }
    ];

    const filteredUsers = USERS.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) && u.id !== 999);

    if (loading) return <PageLayout><div className="flex h-64 items-center justify-center"><div className="animate-spin text-accent-primary"><TrendingUp size={32} /></div></div></PageLayout>;

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex flex-col items-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">{t.school.title}</h1>

                    <GlassTabs
                        tabs={[
                            { id: "schedule", label: t.school.schedule },
                            { id: "canteen", label: t.school.canteen },
                            { id: "search", label: t.school.findUsers }
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
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-white">
                                        {t.school.schedule} {user?.role === "TEACHER" ? `(Teacher View)` : `(Class: ${user?.grade || '11A'})`}
                                    </h3>
                                    
                                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                                        {days.map(d => (
                                            <button
                                                key={d.id}
                                                onClick={() => setSelectedDay(d.id)}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedDay === d.id ? 'bg-accent-primary text-white' : 'text-white/40 hover:text-white'}`}
                                            >
                                                {d.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {activeSchedule.length === 0 && (
                                    <GlassCard className="p-8 text-center text-white/50">
                                        No classes scheduled for this day.
                                    </GlassCard>
                                )}
                                {activeSchedule.map((slot, i) => (
                                    <GlassCard key={i} className="flex items-center justify-between p-4 group hover:bg-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-full bg-white/5 text-accent-primary flex flex-col items-center justify-center w-12 h-12">
                                                <span className="font-bold">{slot.slotOrder}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{slot.subject}</h3>
                                                <p className="text-sm text-white/50 flex items-center gap-1"><Clock size={12}/> {getSlotTiming(slot.slotOrder)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-white font-medium">{slot.room || "TBA"}</span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                                                {user?.role === "TEACHER" ? `Class: ${slot.class}` : `Lesson`}
                                            </span>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>

                            <div className="lg:col-span-1 space-y-4">
                                <h3 className="text-xl font-bold text-white mb-2">{t.school.eventsCalendar}</h3>
                                <GlassCard className="p-0 overflow-hidden">
                                    <div className="p-4 bg-accent-primary/20 text-center font-bold text-white">
                                        {new Date().toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                    <div className="p-4 grid grid-cols-7 gap-1 text-center text-sm">
                                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={`${d}-${i}`} className="text-white/40">{d}</div>)}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                            <div key={d} className={`p-2 rounded-full cursor-pointer hover:bg-white/10 ${d === new Date().getDate() ? 'bg-accent-secondary text-white' : 'text-white/80'}`}>
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 border-t border-white/10 space-y-3 max-h-48 overflow-y-auto">
                                        {events.length === 0 && <p className="text-white/40 text-sm italic">No upcoming events.</p>}
                                        {events.map((ev, idx) => (
                                            <div key={idx} className="flex gap-3 items-start">
                                                <div className={`w-1 h-full rounded-full ${idx % 2 === 0 ? 'bg-accent-secondary' : 'bg-green-500'}`} />
                                                <div>
                                                    <div className="text-sm font-bold text-white">{ev.title}</div>
                                                    <div className="text-xs text-white/50">
                                                        {new Date(ev.date).toLocaleDateString()} • {new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                            className="space-y-6"
                        >
                            {menuItems.length === 0 && (
                                <GlassCard className="p-8 text-center text-white/50">
                                    The cafeteria menu is currently empty.
                                </GlassCard>
                            )}
                            
                            {/* Grouping menu items by category */}
                            {['Hot', 'Salad', 'Drinks', 'Snacks'].map((category) => {
                                const items = menuItems.filter(m => m.category === category);
                                if (items.length === 0) return null;
                                
                                return (
                                    <div key={category} className="space-y-3">
                                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">{category}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {items.map((item, i) => (
                                                <GlassCard key={i} className="flex items-center justify-between p-4 border-l-4 border-l-accent-secondary group hover:bg-white/5 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20">
                                                            <Utensils size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-white text-lg">{item.name}</h3>
                                                            {item.description && <p className="text-sm text-white/50">{item.description}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="font-black text-xl text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-xl">
                                                        {item.price} ₸
                                                    </div>
                                                </GlassCard>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
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
                                placeholder={t.school.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />

                            <div className="grid grid-cols-1 gap-3">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <Link key={user.id} href={`/u/${user.id}`}>
                                            <GlassCard className="flex items-center gap-4 p-4 hover:border-accent-primary/50 cursor-pointer transition-colors group">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-lg">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white group-hover:text-accent-primary transition-colors">{user.name}</h3>
                                                    <p className="text-sm text-white/50">{user.role} • {user.grade || user.school}</p>
                                                </div>
                                            </GlassCard>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center text-white/40 py-8">{t.school.noUsersFound}</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}

