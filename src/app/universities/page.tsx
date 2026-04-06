"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassTabs } from "@/components/ui/glass-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

import { LOCAL_UNIVERSITIES, INTERNATIONAL_UNIVERSITIES } from "@/lib/data/universities";
import { useLanguage } from "@/components/providers/language-provider";

export default function UniversitiesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("local");
    const [score, setScore] = useState("");
    const [subject1, setSubject1] = useState("");
    const [subject2, setSubject2] = useState("");
    const { t, language } = useLanguage();
    const subjects = ["Math", "Physics", "Geography", "History", "Biology", "Chemistry", "English", "Informatics"];
    
    // Store calculated chances for standard mode (array of { name, grantChance, paidChance })
    const [calculatedChances, setCalculatedChances] = useState<Record<string, {grant: number, paid: number}> | null>(null);

    const handleCalculate = () => {
        const unt = parseInt(score);
        if (isNaN(unt) || unt < 50 || unt > 140) {
            setCalculatedChances(null);
            return;
        }

        const chances: Record<string, {grant: number, paid: number}> = {};
        
        // Complex formula per university
        LOCAL_UNIVERSITIES.forEach(uni => {
            // Simplified realistic formula
            // Grant requires higher scores generally depending on university rank
            const rankPenalty = (30 - uni.rank) * 1.5; // Top universities are harder
            const baseGrantReq = 125 - rankPenalty; 
            const basePaidReq = 75 - (rankPenalty / 2);

            let grantChance = Math.max(0, Math.min(100, (unt - baseGrantReq + 20) * 3));
            let paidChance = Math.max(0, Math.min(100, (unt - basePaidReq + 30) * 2));

            chances[uni.name] = { grant: Math.round(grantChance), paid: Math.round(paidChance) };
        });

        setCalculatedChances(chances);
    };

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">{t.universities.title}</h1>
                    <p className="text-white/60">{t.universities.subtitle}</p>

                    <div className="flex justify-center mt-6">
                        <GlassTabs
                            tabs={[
                                { id: "local", label: t.universities.localTab },
                                { id: "international", label: t.universities.internationalTab },
                                { id: "probnyi", label: language === "ru" ? "Пробный ЕНТ" : "Mock UNT" }
                            ]}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            className="w-full max-w-lg"
                        />
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "probnyi" && (
                        <motion.div
                            key="probnyi"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-center p-20"
                        >
                            <GlassCard className="text-center p-12 space-y-4">
                                <h2 className="text-3xl font-bold text-white">В разработке / In Development</h2>
                                <p className="text-white/60">Скоро здесь появится симулятор Пробного ЕНТ.</p>
                            </GlassCard>
                        </motion.div>
                    )}

                    {activeTab === "local" && (
                        <motion.div
                            key="local"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <GlassCard className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-white/5 p-6">
                                <div className="w-full space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-2">{t.universities.subject1}</label>
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
                                    <label className="text-sm font-medium text-white/70 ml-2">{t.universities.subject2}</label>
                                    <select
                                        className="flex h-12 w-full rounded-2xl glass-panel bg-white/5 px-4 py-2 text-white/80 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 appearance-none"
                                        value={subject2}
                                        onChange={(e) => setSubject2(e.target.value)}
                                    >
                                        <option value="" className="bg-slate-900">Select...</option>
                                        {subjects.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                    </select>
                                </div>

                                <GlassInput label={t.universities.untScore} type="number" placeholder="140" value={score} onChange={(e) => setScore(e.target.value)} />
                                <GlassButton variant="primary" className="h-12 w-full" onClick={handleCalculate}>{t.universities.calculateChances}</GlassButton>
                            </GlassCard>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {LOCAL_UNIVERSITIES.map((uni, i) => {
                                    const chanceData = calculatedChances ? calculatedChances[uni.name] : null;

                                    return (
                                        <GlassCard
                                            key={i}
                                            className="flex flex-col gap-4 hover:bg-white/10 cursor-pointer group transition-all"
                                            onClick={() => router.push(`/universities/${encodeURIComponent(uni.name)}`)}
                                        >
                                            <div className="flex justify-between items-start">
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
                                            </div>

                                            {chanceData && (
                                                <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-white/10">
                                                    <div className="flex flex-col items-center bg-white/5 p-2 rounded-xl">
                                                        <span className="text-xs text-white/40">{t.universities.grant}</span>
                                                        <span className={`font-bold ${chanceData.grant > 70 ? 'text-green-400' : chanceData.grant > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                            {chanceData.grant}%
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-center bg-white/5 p-2 rounded-xl">
                                                        <span className="text-xs text-white/40">{t.universities.paid}</span>
                                                        <span className={`font-bold ${chanceData.paid > 70 ? 'text-green-400' : chanceData.paid > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                            {chanceData.paid}%
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </GlassCard>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "international" && (
                        <motion.div
                            key="international"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {/* Filters removed as per requirements */}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {INTERNATIONAL_UNIVERSITIES.map((uni, i) => (
                                    <GlassCard
                                        key={i}
                                        className="flex justify-between items-center group cursor-pointer hover:border-white/20"
                                        onClick={() => router.push(`/universities/${encodeURIComponent(uni.name)}`)}
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
                                                <div className="text-xs text-white/40">{t.universities.worldRank}</div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
