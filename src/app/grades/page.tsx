"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Award, TrendingUp, Plus, X, Eye } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { getStudentGrades, getStudents, saveGrade, deleteGrade, updateGradeValue, createSubject, deleteSubjectByName } from "@/app/actions/grades";

interface GradeItem {
    id?: number;
    score: number;
    max?: number;
}

interface Subject {
    id: string;
    name: string;
    fa: GradeItem[];
    sas: GradeItem[];
    sat: GradeItem;
}

function TeacherInput({ initialValue, onSave, max }: { initialValue: number, onSave: (val: number) => void, max?: number }) {
    const [val, setVal] = useState(initialValue);
    useEffect(() => setVal(initialValue), [initialValue]);
    
    return (
        <input
            className="w-full h-full bg-transparent text-center outline-none text-white p-0 focus:bg-white/10"
            value={val}
            type="number"
            min="0"
            max={max || 100}
            onChange={(e) => setVal(Number(e.target.value))}
            onBlur={() => { if (val !== initialValue) onSave(val); }}
        />
    );
}

export default function GradesPage() {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("view");
    const [viewSubjects, setViewSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    const isTeacher = user?.role === "TEACHER" || user?.role === "ADMIN";

    const [studentsList, setStudentsList] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<number>(user?.id || 0);

    // Generic Sandbox subject for Calculator
    const [calcSubject, setCalcSubject] = useState<Subject>({
        id: "calc",
        name: language === "ru" ? "Симулятор" : "Simulator",
        fa: [{ score: 10 }, { score: 9 }],
        sas: [{ score: 12, max: 15 }],
        sat: { score: 0, max: 40 }
    });

    useEffect(() => {
        if (!user) return;
        const init = async () => {
            if (isTeacher) {
                const stds = await getStudents();
                setStudentsList(stds);
                if (stds.length > 0 && selectedStudent === user.id) {
                    setSelectedStudent(stds[0].id);
                }
            } else {
                setSelectedStudent(user.id);
            }
        };
        init();
    }, [user, isTeacher]);

    useEffect(() => {
        if (!user || !selectedStudent) return;
        const fetchGrades = async () => {
            setLoading(true);
            const data = await getStudentGrades(selectedStudent);
            const formatted = data.map((d: any) => ({
                id: d.id,
                name: d.name,
                fa: d.fa,
                sas: d.sas,
                sat: d.sat || { score: 0, max: 40 }
            }));
            setViewSubjects(formatted);
            setLoading(false);
        };
        fetchGrades();
    }, [selectedStudent, user]);

    const calculateSubjectGrade = (sub: Subject) => {
        let faPart = 0;
        if (sub.fa.length > 0) {
            const faMean = sub.fa.reduce((a, b) => a + b.score, 0) / sub.fa.length;
            faPart = (faMean / 10) * 0.25;
        }

        let sasPart = 0;
        if (sub.sas.length > 0) {
            const sasPercents = sub.sas.map(s => (s.max && s.max > 0 ? s.score / s.max : 0));
            const sasMeanPercent = sasPercents.reduce((a, b) => a + b, 0) / sasPercents.length;
            sasPart = sasMeanPercent * 0.25;
        }

        let satPart = 0;
        if (sub.sat.max && sub.sat.max > 0) {
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

    const currentData = activeTab === "view" ? viewSubjects : [calcSubject];
    const averageKPI = currentData.length > 0 
        ? Math.round(currentData.reduce((acc, s) => acc + calculateSubjectGrade(s), 0) / currentData.length)
        : 0;

    // Handlers for Calculator Mode Only (View is read-only for now unless further integrated)
    const updateCalculator = (field: 'fa' | 'sas' | 'sat', action: string, index?: number, valParams?: any) => {
        if (activeTab === "view") return; // For Teacher editing, you would integrate DB actions here. Keeping simple read-only per constraints to focus on DB fetch & student view.
        
        let newSub = { ...calcSubject };
        
        if (field === 'fa') {
            if (action === 'add') newSub.fa.push({ score: 10 });
            if (action === 'remove' && index !== undefined && newSub.fa.length > 1) newSub.fa.splice(index, 1);
            if (action === 'update' && index !== undefined) newSub.fa[index].score = Math.min(10, Math.max(0, parseFloat(valParams.value) || 0));
        }
        
        if (field === 'sas') {
            if (action === 'add') newSub.sas.push({ score: 15, max: 20 });
            if (action === 'remove' && index !== undefined && newSub.sas.length > 1) newSub.sas.splice(index, 1);
            if (action === 'update' && index !== undefined) {
                if (valParams.key === 'score') newSub.sas[index].score = parseFloat(valParams.value) || 0;
                if (valParams.key === 'max') newSub.sas[index].max = parseFloat(valParams.value) || 0;
            }
        }
        
        if (field === 'sat') {
            if (action === 'update') {
                if (valParams.key === 'score') newSub.sat.score = parseFloat(valParams.value) || 0;
                if (valParams.key === 'max') newSub.sat.max = parseFloat(valParams.value) || 0;
            }
        }
        
        setCalcSubject(newSub);
    };

    const handleDbAction = async (subName: string, type: 'FO'|'SOR'|'SOCH', action: 'add'|'update'|'delete', id?: number, valParams?: any) => {
        if (!isTeacher || !user) return;
        
        if (action === 'delete' && id) {
            await deleteGrade(id);
        } else if (action === 'update' && id && valParams) {
            await updateGradeValue(id, valParams.score, valParams.max || 100);
        } else if (action === 'add' && valParams) {
            await saveGrade(selectedStudent, user.id, subName, type, valParams.score, valParams.max || 100);
        }

        // Re-fetch
        const data = await getStudentGrades(selectedStudent);
        const formatted = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            fa: d.fa,
            sas: d.sas,
            sat: d.sat || { score: 0, max: 40 }
        }));
        setViewSubjects(formatted);
    };

    const handleAddSubject = async () => {
        if (!isTeacher || !user) return;
        const subName = prompt(language === "ru" ? "Введите название предмета:" : "Enter subject name:");
        if (!subName || !subName.trim()) return;
        await createSubject(selectedStudent, user.id, subName.trim());
        
        const data = await getStudentGrades(selectedStudent);
        const formatted = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            fa: d.fa,
            sas: d.sas,
            sat: d.sat || { score: 0, max: 40 }
        }));
        setViewSubjects(formatted);
    };

    const handleDeleteSubject = async (subName: string) => {
        if (!isTeacher || !user) return;
        if (!confirm(language === "ru" ? `Удалить предмет ${subName}?` : `Delete subject ${subName}?`)) return;
        await deleteSubjectByName(selectedStudent, subName);
        
        const data = await getStudentGrades(selectedStudent);
        const formatted = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            fa: d.fa,
            sas: d.sas,
            sat: d.sat || { score: 0, max: 40 }
        }));
        setViewSubjects(formatted);
    };

    if (loading) return <PageLayout><div className="flex h-64 items-center justify-center"><div className="animate-spin text-accent-primary"><TrendingUp size={32} /></div></div></PageLayout>;

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{t.grades.title}</h1>
                        <p className="text-white/60 mb-2">
                            {activeTab === 'view' ? (language === "ru" ? 'Официальные оценки.' : 'Official database grades.') : (language === "ru" ? 'Калькулятор: узнайте свой балл.' : 'Calculator: predict your results.')}
                            {isTeacher && activeTab === 'view' && <span className="text-accent-primary ml-2">(Teacher View)</span>}
                        </p>
                        {isTeacher && activeTab === 'view' && (
                            <div className="flex items-center gap-2 mt-4 bg-white/5 p-2 rounded-xl border border-white/10 inline-flex">
                                <span className={language === "ru" ? "text-sm text-white/60" : "text-sm text-white/60"}>
                                    {language === "ru" ? "Ученик:" : "Student:"}
                                </span>
                                <select 
                                    className="bg-black/50 border border-white/20 text-white p-1 px-3 rounded-lg text-sm outline-none focus:border-accent-primary"
                                    value={selectedStudent}
                                    onChange={(e) => setSelectedStudent(Number(e.target.value))}
                                >
                                    {studentsList.map(st => (
                                        <option key={st.id} value={st.id}>{st.name} ({st.grade || 'N/A'})</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex bg-white/5 rounded-full p-1 self-start md:self-auto">
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
                            {currentData.length === 0 && (
                                <GlassCard className="p-8 text-center text-white/50">
                                    No grades found in the database.
                                </GlassCard>
                            )}

                            {currentData.map((sub, i) => (
                                <motion.div key={sub.id + i} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                                    <GlassCard className="p-6 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                {sub.name}
                                                {activeTab === 'view' && isTeacher && (
                                                    <button onClick={() => handleDeleteSubject(sub.name)} className="text-white/20 hover:text-red-400" title="Delete Subject">
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </h3>
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
                                                    {sub.fa.map((item, idx) => (
                                                        <div key={(item.id || 0) + idx} className={`relative w-12 h-12 rounded-lg flex items-center justify-center font-bold overflow-hidden ${(activeTab === 'view' && !isTeacher) ? 'bg-white/10 text-white' : 'bg-white/5 border border-white/10'}`}>
                                                            {(activeTab === 'view' && !isTeacher) ? item.score : (
                                                                activeTab === 'view' && isTeacher ? (
                                                                    <TeacherInput 
                                                                        initialValue={item.score} 
                                                                        max={10}
                                                                        onSave={(score) => handleDbAction(sub.name, 'FO', 'update', item.id, { score })} 
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        className="w-full h-full bg-transparent text-center outline-none text-white p-0"
                                                                        value={item.score}
                                                                        type="number"
                                                                        min="0" max="10"
                                                                        onChange={(e) => updateCalculator('fa', 'update', idx, { value: e.target.value })}
                                                                    />
                                                                )
                                                            )}
                                                            {((activeTab === 'calc' && sub.fa.length > 0) || (activeTab === 'view' && isTeacher)) && (
                                                                <button
                                                                    onClick={() => {
                                                                        if (activeTab === 'view' && item.id) handleDbAction(sub.name, 'FO', 'delete', item.id);
                                                                        else updateCalculator('fa', 'remove', idx);
                                                                    }}
                                                                    className="absolute top-0 right-0 p-0.5 text-white/20 hover:text-red-400"
                                                                >
                                                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {(activeTab === 'calc' || (activeTab === 'view' && isTeacher)) && (
                                                        <button
                                                            onClick={() => {
                                                                if (activeTab === 'view') handleDbAction(sub.name, 'FO', 'add', undefined, { score: 10, max: 10 });
                                                                else updateCalculator('fa', 'add');
                                                            }}
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
                                                        <div key={(item.id || 0) + idx} className={`relative px-3 py-2 rounded-lg flex flex-col items-center justify-center font-bold ${(activeTab === 'view' && !isTeacher) ? 'bg-white/10 text-white' : 'bg-white/5 border border-white/10'}`}>
                                                            {(activeTab === 'view' && !isTeacher) ? (
                                                                <div className="text-sm">{item.score} <span className="text-white/40 text-[10px]">/ {item.max}</span></div>
                                                            ) : (
                                                                activeTab === 'view' && isTeacher ? (
                                                                    <div className="flex items-center gap-1">
                                                                        <div className="w-8"><TeacherInput initialValue={item.score} max={item.max} onSave={(score) => handleDbAction(sub.name, 'SOR', 'update', item.id, { score, max: item.max })} /></div>
                                                                        <span className="text-white/40">/</span>
                                                                        <div className="w-8"><TeacherInput initialValue={item.max || 20} max={100} onSave={(max) => handleDbAction(sub.name, 'SOR', 'update', item.id, { score: item.score, max })} /></div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-1">
                                                                        <input
                                                                            className="w-8 bg-transparent text-right outline-none text-white border-b border-white/10 focus:border-white/50"
                                                                            value={item.score}
                                                                            onChange={(e) => updateCalculator('sas', 'update', idx, { key: 'score', value: e.target.value })}
                                                                        />
                                                                        <span className="text-white/40">/</span>
                                                                        <input
                                                                            className="w-8 bg-transparent text-left outline-none text-white/60 border-b border-white/10 focus:border-white/50"
                                                                            value={item.max}
                                                                            onChange={(e) => updateCalculator('sas', 'update', idx, { key: 'max', value: e.target.value })}
                                                                        />
                                                                    </div>
                                                                )
                                                            )}
                                                            {((activeTab === 'calc' && sub.sas.length > 1) || (activeTab === 'view' && isTeacher)) && (
                                                                <button 
                                                                    onClick={() => {
                                                                        if (activeTab === 'view' && item.id) handleDbAction(sub.name, 'SOR', 'delete', item.id);
                                                                        else updateCalculator('sas', 'remove', idx);
                                                                    }} 
                                                                    className="absolute -top-1 -right-1 text-white/20 hover:text-red-400"
                                                                ><X size={12} /></button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {(activeTab === 'calc' || (activeTab === 'view' && isTeacher)) && (
                                                        <button
                                                            onClick={() => {
                                                                if (activeTab === 'view') handleDbAction(sub.name, 'SOR', 'add', undefined, { score: 15, max: 20 });
                                                                else updateCalculator('sas', 'add');
                                                            }}
                                                            className="h-full min-h-[50px] aspect-square rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/60 transition-colors"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* SAT Section */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-xs text-white/40 uppercase tracking-wider">{t.grades.soch} (50%)</label>
                                                    {activeTab === 'view' && isTeacher && (sub.sat.max === 0 || !sub.sat.id) && (
                                                        <button
                                                            onClick={() => handleDbAction(sub.name, 'SOCH', 'add', undefined, { score: 20, max: 40 })}
                                                            className="text-xs text-accent-primary hover:text-white px-2 py-1 rounded bg-accent-primary/20"
                                                        >
                                                            <Plus size={12} className="inline mr-1"/> Add SOCH
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                {((activeTab === 'view' && isTeacher && sub.sat.id) || (activeTab === 'view' && !isTeacher && sub.sat.max && sub.sat.max > 0) || activeTab === 'calc') && (
                                                    <div className={`w-32 px-4 py-3 rounded-lg flex items-center justify-center font-bold relative ${(activeTab === 'view' && !isTeacher) ? 'bg-white/10 text-white' : 'bg-white/5 border border-white/10'}`}>
                                                        {(activeTab === 'view' && !isTeacher) ? (
                                                            <div className="text-lg">{sub.sat.score} <span className="text-white/40 text-sm">/ {sub.sat.max}</span></div>
                                                        ) : (
                                                            activeTab === 'view' && isTeacher ? (
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-10"><TeacherInput initialValue={sub.sat.score} max={sub.sat.max || 40} onSave={(score) => handleDbAction(sub.name, 'SOCH', 'update', sub.sat.id, { score, max: sub.sat.max })} /></div>
                                                                    <span className="text-white/40">/</span>
                                                                    <div className="w-10"><TeacherInput initialValue={sub.sat.max || 40} max={100} onSave={(max) => handleDbAction(sub.name, 'SOCH', 'update', sub.sat.id, { score: sub.sat.score, max })} /></div>
                                                                    
                                                                    <button 
                                                                        onClick={() => handleDbAction(sub.name, 'SOCH', 'delete', sub.sat.id)} 
                                                                        className="absolute -top-1 -right-1 text-white/20 hover:text-red-400"
                                                                    ><X size={12} /></button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        className="w-10 bg-transparent text-right outline-none text-white text-lg border-b border-white/10 focus:border-white/50"
                                                                        value={sub.sat.score}
                                                                        onChange={(e) => updateCalculator('sat', 'update', undefined, { key: 'score', value: e.target.value })}
                                                                    />
                                                                    <span className="text-white/40">/</span>
                                                                    <input
                                                                        className="w-10 bg-transparent text-left outline-none text-white/60 text-lg border-b border-white/10 focus:border-white/50"
                                                                        value={sub.sat.max}
                                                                        onChange={(e) => updateCalculator('sat', 'update', undefined, { key: 'max', value: e.target.value })}
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {activeTab === 'view' && isTeacher && (
                            <button onClick={handleAddSubject} className="w-full py-4 mt-4 rounded-xl border-2 border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
                                + {language === 'ru' ? 'Добавить предмет' : 'Add Subject'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
