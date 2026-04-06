"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { Sparkles, ArrowRight, BrainCircuit, BookmarkCheck, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Step {
    title: string;
    description: string;
    duration: string;
}

interface SavedRoadmap {
    id: string;
    goal: string;
    steps: Step[];
    savedAt: string;
}

const STORAGE_KEY = "kazlib_saved_roadmaps";

function loadSaved(): SavedRoadmap[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function persistSaved(list: SavedRoadmap[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function RoadmapPage() {
    const { t } = useLanguage();
    const [goal, setGoal] = useState("");
    const [level, setLevel] = useState("");
    const [time, setTime] = useState("");
    const [deadline, setDeadline] = useState("");
    const [constraints, setConstraints] = useState("");
    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState<Step[] | null>(null);
    const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [justSaved, setJustSaved] = useState(false);

    useEffect(() => {
        setSavedRoadmaps(loadSaved());
    }, []);

    const handleGenerate = async () => {
        if (!goal.trim()) return;
        setLoading(true);
        setSteps(null);
        setJustSaved(false);

        try {
            const response = await fetch("/api/roadmap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ goal, level, time, deadline, constraints }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to generate roadmap");
            }

            const data = await response.json();
            setSteps(data);
        } catch (error) {
            console.error("Error generating roadmap:", error);
            alert(t.roadmap.error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!steps || !goal.trim()) return;
        const newEntry: SavedRoadmap = {
            id: Date.now().toString(),
            goal: goal.trim(),
            steps,
            savedAt: new Date().toLocaleString(),
        };
        const updated = [newEntry, ...savedRoadmaps];
        setSavedRoadmaps(updated);
        persistSaved(updated);
        setJustSaved(true);
    };

    const handleDelete = (id: string) => {
        const updated = savedRoadmaps.filter((r) => r.id !== id);
        setSavedRoadmaps(updated);
        persistSaved(updated);
        if (expandedId === id) setExpandedId(null);
    };

    const handleView = (roadmap: SavedRoadmap) => {
        setGoal(roadmap.goal);
        setSteps(roadmap.steps);
        setJustSaved(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const RoadmapSteps = ({ stepsData }: { stepsData: Step[] }) => (
        <div className="w-full space-y-4 relative pl-8 border-l border-white/10">
            {stepsData.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                >
                    <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-black border-2 border-accent-secondary shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10" />
                    <GlassCard className="flex flex-col gap-1 p-5 hover:border-accent-secondary/50">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/5">
                                {step.duration}
                            </span>
                        </div>
                        <p className="text-white/60 text-sm">{step.description}</p>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );

    return (
        <PageLayout>
            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent-primary/20 text-accent-primary mb-4">
                        <BrainCircuit size={32} />
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        {t.roadmap.title}
                    </h1>
                    <p className="text-white/60">
                        {t.roadmap.desc}
                    </p>
                </motion.div>

                <GlassCard className="w-full flex-col gap-4 p-8">
                    <GlassInput
                        placeholder={t.roadmap.placeholder || "Главная цель (например: сдать IELTS на 7.5)"}
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GlassInput
                            placeholder="Текущий уровень (например: новичок)"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        <GlassInput
                            placeholder="Доступное время (например: 2 часа/день)"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <GlassInput
                            placeholder="Дедлайн (например: 6 месяцев)"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <GlassInput
                            placeholder="Ограничения (например: нулевой бюджет)"
                            value={constraints}
                            onChange={(e) => setConstraints(e.target.value)}
                        />
                    </div>
                    <GlassButton
                        className="w-full mt-4"
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Sparkles className="animate-spin" /> {t.roadmap.generatingBtn}
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                {t.roadmap.generateBtn} <Sparkles size={16} />
                            </span>
                        )}
                    </GlassButton>
                </GlassCard>

                <AnimatePresence mode="wait">
                    {steps && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full space-y-6"
                        >
                            <RoadmapSteps stepsData={steps} />

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: steps.length * 0.2 + 0.3 }}
                            >
                                {justSaved ? (
                                    <div className="w-full text-center py-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center justify-center gap-2">
                                        <BookmarkCheck size={16} />
                                        Сохранено!
                                    </div>
                                ) : (
                                    <GlassButton variant="glass" className="w-full text-sm" onClick={handleSave}>
                                        <BookmarkCheck size={16} /> {t.roadmap.saveBtn}
                                    </GlassButton>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Saved Roadmaps Section */}
                {savedRoadmaps.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full space-y-4"
                    >
                        <div className="flex items-center gap-2 text-white/70">
                            <BookmarkCheck size={18} className="text-accent-secondary" />
                            <h2 className="text-lg font-semibold">{t.roadmap.savedTitle}</h2>
                        </div>

                        <div className="space-y-3">
                            {savedRoadmaps.map((roadmap) => (
                                <motion.div
                                    key={roadmap.id}
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <GlassCard className="flex-col p-4 gap-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium truncate">{roadmap.goal}</p>
                                                <p className="text-white/40 text-xs mt-0.5">{roadmap.savedAt}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <GlassButton
                                                    size="sm"
                                                    variant="glass"
                                                    onClick={() => setExpandedId(expandedId === roadmap.id ? null : roadmap.id)}
                                                    className="text-xs px-3 py-1.5"
                                                >
                                                    {expandedId === roadmap.id ? (
                                                        <><ChevronUp size={14} /> Скрыть</>
                                                    ) : (
                                                        <><ChevronDown size={14} /> {t.roadmap.viewBtn}</>
                                                    )}
                                                </GlassButton>
                                                <GlassButton
                                                    size="sm"
                                                    variant="glass"
                                                    onClick={() => handleView(roadmap)}
                                                    className="text-xs px-3 py-1.5 text-accent-primary border-accent-primary/30"
                                                >
                                                    <ArrowRight size={14} />
                                                </GlassButton>
                                                <GlassButton
                                                    size="sm"
                                                    variant="glass"
                                                    onClick={() => handleDelete(roadmap.id)}
                                                    className="text-xs px-3 py-1.5 text-red-400 border-red-500/20 hover:bg-red-500/10"
                                                >
                                                    <Trash2 size={14} />
                                                </GlassButton>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedId === roadmap.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden pt-2"
                                                >
                                                    <RoadmapSteps stepsData={roadmap.steps} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {savedRoadmaps.length === 0 && !steps && (
                    <p className="text-white/30 text-sm text-center">{t.roadmap.noSaved}</p>
                )}
            </div>
        </PageLayout>
    );
}
