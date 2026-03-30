"use client";

import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { User, Mail, School, MapPin, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import { USERS } from "@/lib/data/users";
import { notFound, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [id, setId] = useState<number | null>(null);

    // Handle params which might be async or undefined initially in some Next.js versions/deployments
    // or simply just ensure we parse it correctly on client side.
    useEffect(() => {
        if (params?.id) {
            setId(Number(params.id));
        }
    }, [params]);

    if (id === null) return <PageLayout><div className="flex justify-center items-center h-[60vh] text-white">Loading...</div></PageLayout>;

    const user = USERS.find(u => u.id === id);

    if (!user) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">User Not Found</h1>
                    <p className="text-white/60">The user you are looking for does not exist.</p>
                    <GlassButton onClick={() => router.back()} variant="glass">
                        Go Back
                    </GlassButton>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-white">Profile</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Avatar Section */}
                    <GlassCard className="col-span-1 flex flex-col items-center p-8 space-y-6 h-fit bg-white/5">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                                {user.avatar}
                            </div>
                            {user.status === "online" && (
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-black" />
                            )}
                        </div>

                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white">{user.name}</h2>
                            <p className="text-accent-primary font-medium">{user.role}</p>
                        </div>

                        <div className="w-full pt-4 border-t border-white/10 space-y-3">
                            {user.grade && (
                                <div className="flex items-center justify-between text-sm text-white/60">
                                    <span>Grade</span>
                                    <span className="text-white">{user.grade}</span>
                                </div>
                            )}
                            {user.school && (
                                <div className="flex items-center justify-between text-sm text-white/60">
                                    <span>School</span>
                                    <span className="text-white truncate max-w-[150px]" title={user.school}>{user.school}</span>
                                </div>
                            )}
                        </div>

                        <Link href="/social" className="w-full">
                            <GlassButton variant="primary" className="w-full justify-center">
                                <MessageCircle size={18} className="mr-2" /> Message
                            </GlassButton>
                        </Link>
                    </GlassCard>

                    {/* Details Section */}
                    <GlassCard className="col-span-1 md:col-span-2 p-8 space-y-8">
                        {/* Bio */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <User size={20} className="text-accent-primary" /> About
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                {user.bio || "No bio available."}
                            </p>
                        </div>

                        {/* Interests */}
                        {user.interests && user.interests.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <School size={20} className="text-accent-primary" /> Interests
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.interests.map((interest, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm text-white/80 border border-white/10">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Info (if available) */}
                        {(user.email || user.phone) && (
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.email && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                            <Mail size={18} className="text-white/40" />
                                            <span className="text-sm text-white">{user.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </PageLayout>
    );
}
