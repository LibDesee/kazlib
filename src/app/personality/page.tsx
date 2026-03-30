"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Check, RefreshCcw } from "lucide-react";

const QUESTIONS = [
    {
        id: 1,
        question: "Как вы предпочитаете решать проблемы?",
        options: [
            { id: "a", text: "Анализ данных и логика", type: "tech" },
            { id: "b", text: "Обсуждение с другими", type: "social" },
            { id: "c", text: "Создание чего-то визуального", type: "creative" },
            { id: "d", text: "Практические эксперименты", type: "science" },
        ],
    },
    {
        id: 2,
        question: "Какой ваш любимый школьный предмет?",
        options: [
            { id: "a", text: "Математика / Информатика", type: "tech" },
            { id: "b", text: "Литература / История", type: "social" },
            { id: "c", text: "Искусство / Дизайн", type: "creative" },
            { id: "d", text: "Физика / Биология", type: "science" },
        ],
    },
    {
        id: 3,
        question: "В групповом проекте вы обычно...",
        options: [
            { id: "a", text: "Организатор / Лидер", type: "social" },
            { id: "b", text: "Строитель / Программист", type: "tech" },
            { id: "c", text: "Дизайнер / Презентатор", type: "creative" },
            { id: "d", text: "Исследователь", type: "science" },
        ],
    },
];

const RESULTS: Record<string, { title: string; desc: string; careers: string[] }> = {
    tech: {
        title: "Инноватор (IT)",
        desc: "Вы любите логику, системы и создание будущего с помощью технологий.",
        careers: ["Программный инженер", "Data Scientist", "Аналитик кибербезопасности"],
    },
    social: {
        title: "Связующее звено (Социальное)",
        desc: "Вы отлично понимаете людей и умеете руководить командами.",
        careers: ["Психолог", "HR-менеджер", "Связи с общественностью"],
    },
    creative: {
        title: "Творец (Искусство)",
        desc: "У вас живое воображение и чувство эстетики.",
        careers: ["UX/UI дизайнер", "Архитектор", "Цифровой художник"],
    },
    science: {
        title: "Исследователь (Наука)",
        desc: "Вам интересно, как устроен мир, и вы любите открытия.",
        careers: ["Биотехнолог", "Исследователь", "Хирург"],
    },
};

export default function PersonalityPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = (type: string) => {
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        // Simple mode: find most frequent answer
        const counts: Record<string, number> = {};
        finalAnswers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
        const winner = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
        setResult(winner);
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
                                <div className="text-accent-secondary text-sm font-bold tracking-widest uppercase mb-2">Вопрос {step + 1} из {QUESTIONS.length}</div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-accent-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <GlassCard className="p-8">
                                <h2 className="text-2xl font-bold text-white mb-8 text-center">{QUESTIONS[step].question}</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {QUESTIONS[step].options.map((option) => (
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
                                                <span className="text-lg">{option.text}</span>
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

                            <h1 className="text-4xl font-bold text-white mb-2">{RESULTS[result].title}</h1>
                            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">{RESULTS[result].desc}</p>

                            <GlassCard className="p-8 mb-8">
                                <h3 className="text-xl font-semibold text-white mb-4">Рекомендуемые профессии</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {RESULTS[result].careers.map((career) => (
                                        <span key={career} className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/10">
                                            {career}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassButton onClick={resetQuiz} variant="secondary">
                                <RefreshCcw size={18} /> Пройти тест заново
                            </GlassButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
