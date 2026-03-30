"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Circle, ArrowRight, BrainCircuit } from "lucide-react";

interface Step {
    title: string;
    description: string;
    duration: string;
}


export default function RoadmapPage() {
    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState<Step[] | null>(null);

    const handleGenerate = async () => {
        if (!goal.trim()) return;
        setLoading(true);
        setSteps(null);

        try {
            const response = await fetch("/api/roadmap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ goal }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to generate roadmap");
            }

            const data = await response.json();
            setSteps(data);
        } catch (error) {
            console.error("Error generating roadmap:", error);
            alert("Произошла ошибка при генерации пути. Убедитесь, что API ключ установлен.");
        } finally {
            setLoading(false);
        }
    };

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
                        AI Roadmap Generator
                    </h1>
                    <p className="text-white/60">
                        Enter your dream career or goal, and our AI will map out the path for you.
                    </p>
                </motion.div>

                <GlassCard className="w-full flex-col gap-4 p-8">
                    <GlassInput
                        placeholder="e.g. Become a Surgeon, Data Scientist, Artist..."
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                    <GlassButton
                        className="w-full mt-4"
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Sparkles className="animate-spin" /> Generating Path...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Generate Roadmap <Sparkles size={16} />
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
                            className="w-full space-y-4 relative pl-8 border-l border-white/10"
                        >
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
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

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: steps.length * 0.2 + 0.5 }}
                                className="pt-4"
                            >
                                <GlassButton variant="glass" className="w-full text-sm">
                                    Save to Profile <ArrowRight size={16} />
                                </GlassButton>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
