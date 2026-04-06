"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await login(name, password);
            if (!res.success) {
                setError(res.error || "Неизвестная ошибка авторизации");
            }
        } catch (err: any) {
            setError(err.message || "Ошибка авторизации");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-background -z-20" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <GlassCard className="p-10 flex flex-col items-center text-center space-y-8 backdrop-blur-3xl bg-black/40 border-white/10">
                    <div className="space-y-2">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 text-accent-primary mb-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <Sparkles size={32} />
                        </div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            KazLib
                        </h1>
                        <p className="text-white/50 text-sm">Sign in to access your digital ecosystem</p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left animate-shake">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2 text-left">
                            <GlassInput
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-black/20"
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <GlassInput
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black/20"
                            />
                        </div>

                        <GlassButton 
                            type="submit"
                            variant="primary" 
                            className="w-full shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)]" 
                            size="lg"
                        >
                            Sign In <ArrowRight size={18} />
                        </GlassButton>
                    </form>

                    <div className="text-white/30 text-xs">
                        Don`t have an account? <span className="text-accent-primary hover:underline cursor-pointer">Request Access</span>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
