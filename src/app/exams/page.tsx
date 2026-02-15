"use client";

import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { TrendingUp, Award, BarChart3, AlertCircle } from "lucide-react";

export default function ExamsPage() {
    const exams = [
        { title: "Algebra Midterm", score: 92, max: 100, date: "12 Oct", avg: 85, rank: "Top 10%" },
        { title: "Physics Mock UNT", score: 35, max: 40, date: "15 Oct", avg: 28, rank: "Top 5%" },
        { title: "History Final", score: 88, max: 100, date: "20 Oct", avg: 76, rank: "Top 15%" },
        { title: "English IELTS Mock", score: 7.5, max: 9.0, date: "25 Oct", avg: 6.5, rank: "Top 5%" },
    ];

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">Exam Results</h1>
                    <p className="text-white/60">Analyze your performance and track your progress.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GlassCard className="p-6 space-y-2 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                        <div className="flex items-center gap-2 text-green-400">
                            <TrendingUp size={20} /> <span className="text-sm font-bold uppercase">Average Score</span>
                        </div>
                        <div className="text-3xl font-bold text-white">89%</div>
                        <div className="text-xs text-white/40">+4% from last term</div>
                    </GlassCard>

                    <GlassCard className="p-6 space-y-2 bg-gradient-to-br from-accent-primary/10 to-transparent border-accent-primary/20">
                        <div className="flex items-center gap-2 text-accent-primary">
                            <Award size={20} /> <span className="text-sm font-bold uppercase">Best Subject</span>
                        </div>
                        <div className="text-3xl font-bold text-white">Physics</div>
                        <div className="text-xs text-white/40">Consistently Top 5%</div>
                    </GlassCard>

                    <GlassCard className="p-6 space-y-2 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
                        <div className="flex items-center gap-2 text-orange-400">
                            <AlertCircle size={20} /> <span className="text-sm font-bold uppercase">Needs Focus</span>
                        </div>
                        <div className="text-3xl font-bold text-white">Biology</div>
                        <div className="text-xs text-white/40">Below class average</div>
                    </GlassCard>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Recent Exams</h2>
                    {exams.map((exam, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-6 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">{exam.title}</h3>
                                    <p className="text-sm text-white/50">{exam.date}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-8 w-full md:w-auto text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-white">{exam.score} <span className="text-sm text-white/30">/ {exam.max}</span></div>
                                        <div className="text-xs text-white/40 uppercase">Score</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-semibold text-white/80">{exam.avg}</div>
                                        <div className="text-xs text-white/40 uppercase">Class Avg</div>
                                    </div>
                                    <div>
                                        <div className="px-3 py-1 rounded-full bg-accent-secondary/20 text-accent-secondary text-sm font-bold inline-block">
                                            {exam.rank}
                                        </div>
                                        <div className="text-xs text-white/40 uppercase mt-1">Ranking</div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
