"use client";

import { useState } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassInput } from "@/components/ui/glass-input";
import { USERS, User } from "@/lib/data/users";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, GraduationCap, Star, Save, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";

export default function TeacherPage() {
    const { t } = useLanguage();
    const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
    const [gradeValue, setGradeValue] = useState("");
    const [subject, setSubject] = useState("Math");
    const [isSaving, setIsSaving] = useState(false);

    const students = USERS.filter(u => u.role === "Student");

    const handleGiveGrade = () => {
        if (!selectedStudent || !gradeValue) return;
        setIsSaving(true);
        // Sync logic simulation: in a real app, this would hit /api/teacher/grade
        setTimeout(() => {
            alert(`Grade ${gradeValue} for ${subject} assigned to ${selectedStudent.name}. Both teacher and student views updated.`);
            setIsSaving(false);
            setGradeValue("");
        }, 1000);
    };

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                <header className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-black text-white">Teacher Dashboard</h1>
                    <p className="text-white/60">Manage students, assign grades, and monitor academic progress.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Student List */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <UserIcon size={20} className="text-accent-primary"/> Students
                        </h2>
                        <div className="space-y-3">
                            {students.map((student) => (
                                <GlassCard 
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={`p-4 cursor-pointer hover:border-accent-primary/50 transition-all ${selectedStudent?.id === student.id ? 'bg-accent-primary/20 border-accent-primary' : 'bg-white/5'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                                            {student.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{student.name}</h3>
                                            <p className="text-xs text-white/50">{student.grade} • {student.school}</p>
                                        </div>
                                        {selectedStudent?.id === student.id && <ArrowRight size={16} className="ml-auto text-accent-primary" />}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Grading Area */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {selectedStudent ? (
                                <motion.div
                                    key={selectedStudent.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full"
                                >
                                    <GlassCard className="h-full p-8 flex flex-col gap-8 bg-black/40 border-white/10 backdrop-blur-3xl">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-3xl text-white font-black shadow-2xl">
                                                    {selectedStudent.avatar}
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold text-white">{selectedStudent.name}</h2>
                                                    <div className="flex gap-2 mt-2">
                                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 uppercase tracking-widest">{selectedStudent.grade}</span>
                                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 uppercase tracking-widest">Student</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={`/u/${selectedStudent.id}`}>
                                                <GlassButton size="sm" variant="glass">View Profile</GlassButton>
                                            </Link>
                                        </div>

                                        <div className="h-px bg-white/10 w-full" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <Star size={18} className="text-yellow-400"/> Assign New Grade
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-white/50 ml-1">Subject</label>
                                                        <select 
                                                            className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-accent-primary/50"
                                                            value={subject}
                                                            onChange={(e) => setSubject(e.target.value)}
                                                        >
                                                            <option value="Math" className="bg-slate-900">Mathematics</option>
                                                            <option value="Physics" className="bg-slate-900">Physics</option>
                                                            <option value="History" className="bg-slate-900">History</option>
                                                            <option value="Informatics" className="bg-slate-900">Informatics</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-white/50 ml-1">Grade (0-10 или 100%)</label>
                                                        <GlassInput 
                                                            type="text" 
                                                            placeholder="e.g. 10 or 95%" 
                                                            value={gradeValue} 
                                                            onChange={(e) => setGradeValue(e.target.value)}
                                                        />
                                                    </div>
                                                    <GlassButton 
                                                        variant="primary" 
                                                        className="w-full mt-4" 
                                                        onClick={handleGiveGrade}
                                                        loading={isSaving}
                                                    >
                                                        <Save size={18} className="mr-2"/> Save Grade
                                                    </GlassButton>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <GraduationCap size={18} className="text-accent-secondary"/> Performance History
                                                </h3>
                                                <div className="space-y-2">
                                                    {[
                                                        { subject: "Mathematics", grade: "9.5", date: "2 days ago" },
                                                        { subject: "Physics", grade: "10", date: "Yesterday" },
                                                        { subject: "History", grade: "8", date: "Last week" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                                            <div>
                                                                <div className="text-sm font-bold text-white">{item.subject}</div>
                                                                <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.date}</div>
                                                            </div>
                                                            <div className="text-xl font-black text-accent-primary">{item.grade}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-white/30 border border-white/5 bg-white/5 rounded-3xl p-20 text-center">
                                    <div className="p-8 rounded-full bg-white/5 mb-6">
                                        <UserIcon size={64} className="opacity-20" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">No Student Selected</h3>
                                    <p className="max-w-xs">Select a student from the menu on the left to manage their grades and view details.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
