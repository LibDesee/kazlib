"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassTabs } from "@/components/ui/glass-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, MapPin, Medal, Star, X, ExternalLink, Info } from "lucide-react";

export default function UniversitiesPage() {
    const [activeTab, setActiveTab] = useState("local");
    const [score, setScore] = useState("");
    const [subject1, setSubject1] = useState("");
    const [subject2, setSubject2] = useState("");
    const [selectedUni, setSelectedUni] = useState<any>(null);

    const subjects = ["Math", "Physics", "Geography", "History", "Biology", "Chemistry", "English", "Informatics"];

    const localUniversities = [
        { name: "Nazarbayev University", city: "Astana", rank: 1, chance: 85, type: "Grant", desc: "Top research university, English medium.", price: "Free (Grant)", site: "nu.edu.kz" },
        { name: "KBTU", city: "Almaty", rank: 2, chance: 92, type: "Grant", desc: "Leading technical university in IT and Oil & Gas.", price: "1.2M ₸/yr", site: "kbtu.kz" },
        { name: "SDU", city: "Almaty", rank: 3, chance: 78, type: "Paid", desc: "Suleyman Demirel University, strong in Philology and Engineering.", price: "1.5M ₸/yr", site: "sdu.edu.kz" },
        { name: "KazNU", city: "Almaty", rank: 4, chance: 95, type: "Grant", desc: "Al-Farabi Kazakh National University, oldest and largest.", price: "Free (Grant)", site: "kaznu.kz" },
    ];

    const internationalUniversities = [
        { name: "MIT", country: "USA", rank: 1, worldRank: "#1", desc: "Massachusetts Institute of Technology.", price: "$60,000/yr" },
        { name: "Oxford", country: "UK", rank: 2, worldRank: "#4", desc: "University of Oxford, oldest in English speaking world.", price: "£30,000/yr" },
        { name: "Stanford", country: "USA", rank: 3, worldRank: "#2", desc: "Stanford University, located in Silicon Valley.", price: "$58,000/yr" },
        { name: "ETH Zurich", country: "Switzerland", rank: 8, worldRank: "#9", desc: "Swiss Federal Institute of Technology.", price: "CHF 1,500/yr" },
    ];

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">University Hub</h1>
                    <p className="text-white/60">Find your perfect academic destination.</p>

                    <div className="flex justify-center mt-6">
                        <GlassTabs
                            tabs={[
                                { id: "local", label: "Kazakhstan (UNT)" },
                                { id: "international", label: "International" }
                            ]}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            className="w-64"
                        />
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "local" ? (
                        <motion.div
                            key="local"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <GlassCard className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-white/5 p-6">
                                <div className="w-full space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-2">Subject 1</label>
                                    <select
                                        className="flex h-12 w-full rounded-2xl glass-panel bg-white/5 px-4 py-2 text-white/80 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 appearance-none"
                                        value={subject1}
                                        onChange={(e) => setSubject1(e.target.value)}
                                    >
                                        <option value="" className="bg-slate-900">Select...</option>
                                        {subjects.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                    </select>
                                </div>
                                <div className="w-full space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-2">Subject 2</label>
                                    <select
                                        className="flex h-12 w-full rounded-2xl glass-panel bg-white/5 px-4 py-2 text-white/80 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 appearance-none"
                                        value={subject2}
                                        onChange={(e) => setSubject2(e.target.value)}
                                    >
                                        <option value="" className="bg-slate-900">Select...</option>
                                        {subjects.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                    </select>
                                </div>

                                <GlassInput label="UNT Score" type="number" placeholder="140" value={score} onChange={(e) => setScore(e.target.value)} />
                                <GlassButton variant="primary" className="h-12 w-full">Calculate Chances</GlassButton>
                            </GlassCard>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {localUniversities.map((uni, i) => (
                                    <GlassCard
                                        key={i}
                                        className="flex justify-between items-center hover:bg-white/10 cursor-pointer group transition-all"
                                        onClick={() => setSelectedUni(uni)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                                {uni.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{uni.name}</h3>
                                                <p className="text-sm text-white/50 flex items-center gap-1">
                                                    <MapPin size={12} /> {uni.city}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-accent-secondary font-bold">{uni.chance}% Chance</div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${uni.type === 'Grant' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'}`}>
                                                {uni.type}
                                            </span>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="international"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                                {["Top 100", "Top 300", "Top 500", "Scholarships", "USA", "UK", "Europe"].map((filter) => (
                                    <button key={filter} className="text-sm px-4 py-2 rounded-full glass-panel hover:bg-white/10 whitespace-nowrap active:bg-accent-primary/20 transition-colors">
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {internationalUniversities.map((uni, i) => (
                                    <GlassCard
                                        key={i}
                                        className="flex justify-between items-center group cursor-pointer hover:border-white/20"
                                        onClick={() => setSelectedUni(uni)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <Globe size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-accent-primary transition-colors">{uni.name}</h3>
                                                <p className="text-sm text-white/50">{uni.country}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-white font-bold text-lg">{uni.worldRank}</div>
                                                <div className="text-xs text-white/40">World Rank</div>
                                            </div>
                                            <GlassButton size="sm" variant="glass">Details</GlassButton>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedUni && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setSelectedUni(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-lg glass-panel bg-slate-900/90 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setSelectedUni(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} className="text-white/60" />
                                </button>

                                <div className="flex flex-col items-center text-center space-y-4 mb-6">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                        {selectedUni.name[0]}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedUni.name}</h2>
                                        <p className="text-white/60 flex items-center justify-center gap-1">
                                            <MapPin size={14} /> {selectedUni.city || selectedUni.country}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                                        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider">About</h3>
                                        <p className="text-white/80">{selectedUni.desc}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-1">Tuition</h3>
                                            <p className="text-white font-semibold">{selectedUni.price}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-1">Ranking</h3>
                                            <p className="text-white font-semibold">{selectedUni.rank ? `#${selectedUni.rank} Local` : selectedUni.worldRank}</p>
                                        </div>
                                    </div>

                                    {selectedUni.site && (
                                        <a href={`https://${selectedUni.site}`} target="_blank" rel="noopener noreferrer" className="block">
                                            <GlassButton variant="primary" className="w-full">
                                                Visit Website <ExternalLink size={16} className="ml-2" />
                                            </GlassButton>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
