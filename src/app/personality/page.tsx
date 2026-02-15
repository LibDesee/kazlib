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
        question: "How do you prefer to solve problems?",
        options: [
            { id: "a", text: "Analyzing data and logic", type: "tech" },
            { id: "b", text: "Discussing with others", type: "social" },
            { id: "c", text: "Creating something visual", type: "creative" },
            { id: "d", text: "Hands-on experimentation", type: "science" },
        ],
    },
    {
        id: 2,
        question: "What's your favorite school subject?",
        options: [
            { id: "a", text: "Mathematics / Informatics", type: "tech" },
            { id: "b", text: "Literature / History", type: "social" },
            { id: "c", text: "Art / Design", type: "creative" },
            { id: "d", text: "Physics / Biology", type: "science" },
        ],
    },
    {
        id: 3,
        question: "In a group project, you are usually...",
        options: [
            { id: "a", text: "The Organizer / Leader", type: "social" },
            { id: "b", text: "The Builder / Coder", type: "tech" },
            { id: "c", text: "The Designer / Presenter", type: "creative" },
            { id: "d", text: "The Researcher", type: "science" },
        ],
    },
];

const RESULTS: Record<string, { title: string; desc: string; careers: string[] }> = {
    tech: {
        title: "The Innovator (Tech)",
        desc: "You love logic, systems, and building the future with technology.",
        careers: ["Software Engineer", "Data Scientist", "Cybersecurity Analyst"],
    },
    social: {
        title: "The Connector (Social)",
        desc: "You excel at understanding people and leading teams.",
        careers: ["Psychologist", "HR Manager", "Public Relations"],
    },
    creative: {
        title: "The Creator (Arts)",
        desc: "You have a vivid imagination and an eye for aesthetics.",
        careers: ["UX/UI Designer", "Architect", "Digital Artist"],
    },
    science: {
        title: "The Explorer (Science)",
        desc: "You are curious about how the world works and love discovery.",
        careers: ["Biotechnologist", "Researcher", "Surgeon"],
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
                                <div className="text-accent-secondary text-sm font-bold tracking-widest uppercase mb-2">Question {step + 1} of {QUESTIONS.length}</div>
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
                                <h3 className="text-xl font-semibold text-white mb-4">Recommended Careers</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {RESULTS[result].careers.map((career) => (
                                        <span key={career} className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/10">
                                            {career}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassButton onClick={resetQuiz} variant="secondary">
                                <RefreshCcw size={18} /> Retake Test
                            </GlassButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageLayout>
    );
}
