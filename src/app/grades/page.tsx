"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassTabs } from "@/components/ui/glass-tabs";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Award, TrendingUp, Calendar, Plus, X, Eye, Edit3, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

// Types
interface GradeItem {
    score: number;
    max: number;
}

interface Subject {
    id: number;
    name: string;
    fa: number[]; // Simple 0-10 scores
    sas: GradeItem[]; // SOR: Score + Max
    sat: GradeItem; // SOCH: Score + Max
}

export default function GradesPage() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState("view"); // 'view' or 'calc'

    // Mock Data for View Mode
    const [viewSubjects] = useState<Subject[]>([
        {
            id: 1,
            name: "Algebra",
            fa: [9, 10, 8],
            sas: [{ score: 14, max: 15 }],
            sat: { score: 35, max: 40 }
        },
        {
            id: 2,
            name: "Physics",
            fa: [10, 10],
            sas: [{ score: 13, max: 15 }],
            sat: { score: 38, max: 40 }
        },
        {
            id: 3,
            name: "History",
            fa: [8, 9, 10],
            sas: [{ score: 15, max: 20 }],
            sat: { score: 32, max: 40 }
        },
    ]);

    // Editable Data for Calculator Mode
    const [calcSubjects, setCalcSubjects] = useState<Subject[]>([
        {
            id: 1,
            name: "Algebra",
            fa: [9, 10],
            sas: [{ score: 12, max: 15 }],
            sat: { score: 0, max: 40 }
        },
        {
            id: 2,
            name: "Physics",
            fa: [10],
            sas: [],
            sat: { score: 0, max: 40 }
        },
    ]);

    const calculateSubjectGrade = (sub: Subject) => {
        // 1. FA: Mean of scores (0-10), then 25% of that
        // Formula says: "Average from FA... then take 25%". 
        // Usually FA is out of 10. So (Mean / 10) * 0.25
        let faPart = 0;
        if (sub.fa.length > 0) {
            const faMean = sub.fa.reduce((a, b) => a + b, 0) / sub.fa.length;
            faPart = (faMean / 10) * 0.25;
        }

        // 2. SAS (SOR): "Percentage from each... then mean of percentages... then 25%"
        let sasPart = 0;
        if (sub.sas.length > 0) {
            const sasPercents = sub.sas.map(s => (s.max > 0 ? s.score / s.max : 0));
            const sasMeanPercent = sasPercents.reduce((a, b) => a + b, 0) / sasPercents.length;
            sasPart = sasMeanPercent * 0.25;
        }

        // 3. SAT (SOCH): "(Score/Max) * 50%"
        let satPart = 0;
        if (sub.sat.max > 0) {
            satPart = (sub.sat.score / sub.sat.max) * 0.50;
        }

        const finalPercent = (faPart + sasPart + satPart) * 100;
        return Math.min(100, Math.max(0, Math.round(finalPercent)));
    };

    const getGradeColor = (grade: number) => {
        if (grade >= 90) return "text-green-400";
        if (grade >= 75) return "text-blue-400";
        if (grade >= 50) return "text-yellow-400";
        return "text-red-400";
    };

    const currentData = activeTab === "view" ? viewSubjects : calcSubjects;
    const averageKPI = Math.round(currentData.reduce((acc, s) => acc + calculateSubjectGrade(s), 0) / (currentData.length || 1));

    // --- Handlers for Calculator ---

    const updateFA = (subId: number, index: number, value: string) => {
        const num = Math.min(10, Math.max(0, parseFloat(value) || 0));
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            const newFa = [...s.fa];
            newFa[index] = num;
            return { ...s, fa: newFa };
        }));
    };

    const addFA = (subId: number) => {
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            return { ...s, fa: [...s.fa, 10] }; // default 10
        }));
    };

    const removeFA = (subId: number, index: number) => {
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            const newFa = s.fa.filter((_, i) => i !== index);
            return { ...s, fa: newFa };
        }));
    };

    const updateSAS = (subId: number, index: number, field: 'score' | 'max', value: string) => {
        const num = parseFloat(value) || 0;
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            const newSas = [...s.sas];
            newSas[index] = { ...newSas[index], [field]: num };
            return { ...s, sas: newSas };
        }));
    };

    const addSAS = (subId: number) => {
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            return { ...s, sas: [...s.sas, { score: 15, max: 20 }] }; // default
        }));
    };

    const removeSAS = (subId: number, index: number) => {
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            const newSas = s.sas.filter((_, i) => i !== index);
            return { ...s, sas: newSas };
        }));
    };

    const updateSAT = (subId: number, field: 'score' | 'max', value: string) => {
        const num = parseFloat(value) || 0;
        setCalcSubjects(prev => prev.map(s => {
            if (s.id !== subId) return s;
            return { ...s, sat: { ...s.sat, [field]: num } };
        }));
    };

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{t.grades.title}</h1>
                        <p className="text-white/60">
                            {activeTab === 'view' ? 'Official grades from database.' : 'Calculator: predict your results.'}
                        </p>
                    </div>

                    <div className="flex bg-white/5 rounded-full p-1">
                        <button
                            onClick={() => setActiveTab("view")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${activeTab === "view" ? "bg-accent-primary text-white shadow-lg" : "text-white/60 hover:text-white"}`}
                        >
                            <Eye size={18} /> {t.grades.viewMode}
                        </button>
                        <button
                            onClick={() => setActiveTab("calc")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${activeTab === "calc" ? "bg-accent-secondary text-white shadow-lg" : "text-white/60 hover:text-white"}`}
                        >
                            <Calculator size={18} /> {t.grades.calcMode}
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* KPI Circle */}
                    <div className="lg:col-span-1">
                        <GlassCard className="sticky top-24 p-6 flex flex-col items-center justify-center space-y-6">
                            <h3 className="text-white/60 uppercase tracking-widest text-sm">{t.grades.overall}</h3>
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                                    <motion.circle
                                        cx="50%" cy="50%" r="45%" fill="none" stroke={activeTab === 'view' ? '#3B82F6' : '#8B5CF6'} strokeWidth="12"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * averageKPI) / 100}
                                        strokeLinecap="round"
                                        initial={{ strokeDashoffset: 283 }}
                                        animate={{ strokeDashoffset: 283 - (283 * averageKPI) / 100 }}
                                        transition={{ duration: 1 }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-bold text-white">{averageKPI}%</span>
                                    <span className={`text-sm ${getGradeColor(averageKPI)}`}>{averageKPI >= 90 ? 'Excellent' : 'Good'}</span>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Grades List */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {currentData.map((sub) => (
                                <motion.div key={sub.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                                    <GlassCard className="p-6 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-white">{sub.name}</h3>
                                            <span className={`text-2xl font-bold ${getGradeColor(calculateSubjectGrade(sub))}`}>
                                                {calculateSubjectGrade(sub)}%
                                            </span>
                                        </div>

                                        {/* Assessment Rows */}
                                        <div className="space-y-4">
                                            {/* FA Section */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-xs text-white/40 uppercase tracking-wider">{t.grades.formative} (25%)</label>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {sub.fa.map((score, idx) => (
                                                        <div key={idx} className={`relative w-12 h-12 rounded-lg flex items-center justify-center font-bold overflow-hidden ${activeTab === 'view' ? 'bg-white/10 text-white' : 'bg-white/5 border border-white/10'}`}>
                                                            {activeTab === 'view' ? score : (
                                                                <input
                                                                    className="w-full h-full bg-transparent text-center outline-none text-white p-0"
                                                                    value={score}
                                                                    type="number"
                                                                    min="0" max="10"
                                                                    onChange={(e) => updateFA(sub.id, idx, e.target.value)}
                                                                />
                                                            )}
                                                            {activeTab === 'calc' && (
                                                                <button
                                                                    onClick={() => removeFA(sub.id, idx)}
                                                                    className="absolute top-0 right-0 p-0.5 text-white/20 hover:text-red-400"
                                                                >
                                                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {activeTab === 'calc' && (
                                                        <button
                                                            onClick={() => addFA(sub.id)}
                                                            className="w-12 h-12 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/60 transition-colors"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* SAS Section */}
                                            <div className="space-y-2">
                                                <label className="text-xs text-white/40 uppercase tracking-wider">{t.grades.sor} (25%)</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {sub.sas.map((item, idx) => (
                                                        <div key={idx} className={`relative px-3 py-2 rounded-lg flex flex-col items-center justify-center font-bold ${activeTab === 'view' ? 'bg-white/10 text-white' : 'bg-white/5 border border-white/10'}`}>
                                                            {activeTab === 'view' ? (
                                                                <div className="text-sm">{item.score} <span className="text-white/40 text-[10px]">/ {item.max}</span></div>
                                                            ) : (
                                                                <div className="flex items-center gap-1">
                                                                    <input
                                                                        className="w-8 bg-transparent text-right outline-none text-white border-b border-white/10 focus:border-white/50"
                                                                        value={item.score}
                                                                        onChange={(e) => updateSAS(sub.id, idx, 'score', e.target.value)}
                                                                    />
                                                                    <span className="text-white/40">/</span>
                                                                    <input
                                                                        className="w-8 bg-transparent text-left outline-none text-white/60 border-b border-white/10 focus:border-white/50"
                                                                        value={item.max}
                                                                        onChange={(e) => updateSAS(sub.id, idx, 'max', e.target.value)}
                                                                    />
                                                                </div>
                                                            )}
                                                            {activeTab === 'calc' && (
                                                                <button onClick={() => removeSAS(sub.id, idx)} className="absolute -top-1 -right-1 text-white/20 hover:text-red-400"><X size={12} /></button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {activeTab === 'calc' && (
                                                        <button
                                                            onClick={() => addSAS(sub.id)}
                                                            className="h-full min-h-[50px] aspect-square rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/60 transition-colors"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* SAT Section */}
                                            <div className="space-y-2">
                                                <label className="text-xs text-white/40 uppercase tracking-wider">{t.grades.soch} (50%)</label>
                                                <div className={`w-32 px-4 py-3 rounded-lg flex items-center justify-center font-bold ${activeTab === 'view' ? 'bg-white/10 text-white' : 'bg-white/5 border border-white/10'}`}>
                                                    {activeTab === 'view' ? (
                                                        <div className="text-lg">{sub.sat.score} <span className="text-white/40 text-sm">/ {sub.sat.max}</span></div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                className="w-10 bg-transparent text-right outline-none text-white text-lg border-b border-white/10 focus:border-white/50"
                                                                value={sub.sat.score}
                                                                onChange={(e) => updateSAT(sub.id, 'score', e.target.value)}
                                                            />
                                                            <span className="text-white/40">/</span>
                                                            <input
                                                                className="w-10 bg-transparent text-left outline-none text-white/60 text-lg border-b border-white/10 focus:border-white/50"
                                                                value={sub.sat.max}
                                                                onChange={(e) => updateSAT(sub.id, 'max', e.target.value)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {activeTab === 'calc' && (
                            <GlassButton className="w-full mt-4" variant="glass" onClick={() => {
                                setCalcSubjects([...calcSubjects, { id: Date.now(), name: "New Subject", fa: [], sas: [], sat: { score: 0, max: 40 } }])
                            }}>
                                <Plus size={18} className="mr-2" /> {t.grades.addGrade}
                            </GlassButton>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
