"use client";

import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function UnderDevelopment({ title, desc }: { title: string; desc: string }) {
    return (
        <PageLayout>
            <div className="min-h-[60vh] flex items-center justify-center">
                <GlassCard className="p-12 text-center max-w-lg space-y-6">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 10 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
                        className="inline-flex p-6 rounded-full bg-white/5 text-yellow-500 mb-4"
                    >
                        <Construction size={48} />
                    </motion.div>

                    <h1 className="text-4xl font-bold text-white">{title}</h1>
                    <p className="text-white/60">{desc}</p>

                    <div className="pt-4">
                        <Link href="/">
                            <GlassButton variant="glass">
                                <ArrowLeft size={18} /> Back Home
                            </GlassButton>
                        </Link>
                    </div>
                </GlassCard>
            </div>
        </PageLayout>
    );
}
