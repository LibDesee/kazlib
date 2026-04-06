"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { User, Mail, Phone, School, Save, Camera, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { updateProfileInDb } from "@/app/actions/auth";

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        school: "",
        grade: "",
        interests: "",
        language: "RU",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                school: user.school || "",
                grade: user.grade || "",
                interests: user.interests || "",
                language: user.language || "RU",
            });
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const res = await updateProfileInDb(user.id, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                school: formData.school,
                grade: formData.grade,
                interests: formData.interests,
                language: formData.language,
            });
            if (res.success) {
                updateProfile({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    school: formData.school,
                    grade: formData.grade,
                    interests: formData.interests,
                    language: formData.language,
                });
                alert("Профиль успешно сохранен! / Profile saved!");
            } else {
                alert("Ошибка сохранения: " + res.error);
            }
        } catch (e: any) {
            alert("Error: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Мой Профиль / My Profile</h1>
                    <p className="text-white/60">Управление личной информацией / Manage your personal information</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Avatar Section */}
                    <GlassCard className="col-span-1 flex flex-col items-center p-8 space-y-6 h-fit bg-white/5">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                                {user.avatar || user.name.charAt(0)}
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Camera className="text-white" />
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white">{user.name}</h2>
                            <p className="text-accent-primary font-medium">{user.role}</p>
                        </div>

                        <div className="w-full pt-4 border-t border-white/10 space-y-3">
                            <div className="flex items-center justify-between text-sm text-white/60">
                                <span>Класс / Grade</span>
                                <span className="text-white">{user.grade}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-white/60">
                                <span>Школа / School</span>
                                <span className="text-white truncate max-w-[150px]">{user.school}</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Edit Form */}
                    <GlassCard className="col-span-1 md:col-span-2 p-8 space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <User size={20} /> Личная информация / Personal Info
                        </h3>

                        <div className="flex flex-col space-y-4">

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GlassInput
                                label="Имя / Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <GlassInput
                                label="Класс / Grade"
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70 ml-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3 text-white/40" size={18} />
                                    <input
                                        className="flex h-12 w-full rounded-2xl glass-panel bg-white/5 pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70 ml-2">Телефон / Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3 text-white/40" size={18} />
                                    <input
                                        className="flex h-12 w-full rounded-2xl glass-panel bg-white/5 pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <GlassInput
                            label="Школа / School"
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-2">Интересы / Interests (comma separated)</label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-2xl glass-panel bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none"
                                value={formData.interests}
                                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <GlassButton onClick={handleSave} variant="primary" className="w-full md:w-auto" disabled={saving}>
                                <Save size={18} className={saving ? "animate-spin" : ""} /> {saving ? "Сохранение..." : "Сохранить / Save Changes"}
                            </GlassButton>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </PageLayout>
    );
}
