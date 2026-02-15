"use client";

import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { MessageCircle, School, Award, Hash, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicProfilePage({ params }: { params: { id: string } }) {
    const router = useRouter();

    // Mock data fetching based on ID
    const profile = {
        id: params.id,
        name: "Aizere M.",
        role: "Student",
        grade: "11A",
        school: "NIS PhM Almaty",
        avatar: "AM",
        bio: "Aspiring Surgeon. President of Biology Club. Loves Chess.",
        interests: ["Biology", "Chemistry", "Chess"],
    };

    const handleMessage = () => {
        // In a real app, we would start a chat here
        router.push("/social");
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/social" className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Back to Social
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1 space-y-6">
                        <GlassCard className="flex flex-col items-center p-8 space-y-4 text-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                                {profile.avatar}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                                <p className="text-accent-secondary">{profile.role}</p>
                            </div>

                            <GlassButton variant="primary" className="w-full" onClick={handleMessage}>
                                <MessageCircle size={18} className="mr-2" /> Message
                            </GlassButton>
                        </GlassCard>

                        <GlassCard className="p-6 space-y-4">
                            <div className="flex items-center gap-3 text-white/80">
                                <School size={20} className="text-white/40" />
                                <div className="text-sm">
                                    <div className="text-xs text-white/40">School</div>
                                    {profile.school}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <Hash size={20} className="text-white/40" />
                                <div className="text-sm">
                                    <div className="text-xs text-white/40">Grade</div>
                                    {profile.grade}
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <GlassCard className="p-8 space-y-4">
                            <h2 className="text-xl font-bold text-white">About</h2>
                            <p className="text-white/60 leading-relaxed">
                                {profile.bio}
                            </p>

                            <div className="pt-4">
                                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-3">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.interests.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-sm border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Award size={20} /> Achievements
                            </h2>

                            <div className="space-y-4">
                                <div className="flex gap-4 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Biology Olympiad Winner</h4>
                                        <p className="text-sm text-white/50">District Level • 2025</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Honor Roll</h4>
                                        <p className="text-sm text-white/50">Fall Semester • 2025</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
