"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, RefreshCcw } from "lucide-react";
import { PERSONALITY_QUESTIONS, PERSONALITY_RESULTS } from "@/lib/data/personality";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";

export default function PersonalityPage() {
    const { language } = useLanguage();
    const { user, updateProfile } = useAuth();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = (type: string) => {
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);

        if (step < PERSONALITY_QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        const counts: Record<string, number> = {};
        finalAnswers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
        const winner = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
        setResult(winner);

        // Optional: save result to user profile if they want (could be an interests update)
        // This is a nice-to-have but not strictly required
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="w-full"
                        >
                            <div className="mb-8 text-center">
                                <div className="text-accent-secondary text-sm font-bold tracking-widest uppercase mb-2">
                                    {language === "ru" ? "Вопрос" : "Question"} {step + 1} / {PERSONALITY_QUESTIONS.length}
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-accent-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((step + 1) / PERSONALITY_QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <GlassCard className="p-8">
                                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                                    {PERSONALITY_QUESTIONS[step].question[language as keyof typeof PERSONALITY_QUESTIONS[0]["question"]] || PERSONALITY_QUESTIONS[step].question.en}
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {PERSONALITY_QUESTIONS[step].options.map((option) => (
                                        <GlassButton
                                            key={option.id}
                                            variant="glass"
                                            className="justify-start text-left h-auto py-4 px-6 hover:bg-white/20 hover:border-accent-primary/50 group"
                                            onClick={() => handleAnswer(option.type)}
                                        >
                                            <div className="flex items-center gap-4 w-full">
                                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-sm font-medium group-hover:bg-accent-primary group-hover:border-transparent transition-colors">
                                                    {option.id.toUpperCase()}
                                                </div>
                                                <span className="text-lg">
                                                    {option.text[language as keyof typeof option.text] || option.text.en}
                                                </span>
                                            </div>
                                        </GlassButton>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full text-center"
                        >
                            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary mb-6 shadow-2xl shadow-accent-primary/40 animate-pulse">
                                <BrainCircuit size={64} className="text-white" />
                            </div>

                            <h1 className="text-4xl font-bold text-white mb-2">
                                {PERSONALITY_RESULTS[result as keyof typeof PERSONALITY_RESULTS].title[language as "ru" | "en"]}
                            </h1>
                            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
                                {PERSONALITY_RESULTS[result as keyof typeof PERSONALITY_RESULTS].desc[language as "ru" | "en"]}
                            </p>

                            <GlassCard className="p-8 mb-8">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {language === "ru" ? "Рекомендуемые профессии" : "Recommended Careers"}
                                </h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {PERSONALITY_RESULTS[result as keyof typeof PERSONALITY_RESULTS].careers[language as "ru" | "en"].map((career) => (
                                        <span key={career} className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/10">
                                            {career}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassButton onClick={resetQuiz} variant="secondary">
                                <RefreshCcw size={18} /> {language === "ru" ? "Пройти тест заново" : "Retake Quiz"}
                            </GlassButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
