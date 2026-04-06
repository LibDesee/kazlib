"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home,
    Map,
    GraduationCap,
    BrainCircuit,
    Calculator,
    School,
    MessageCircle,
    Sparkles,
    LogOut,
    User,
    Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";


export function Navigation() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navItems = [
        { name: t.nav.home, href: "/", icon: Home },
        { name: t.nav.roadmap, href: "/roadmap", icon: Map },
        { name: t.nav.unis, href: "/universities", icon: GraduationCap },
        { name: t.nav.personality, href: "/personality", icon: BrainCircuit },
        { name: t.nav.grades, href: "/grades", icon: Calculator },
        { name: t.nav.school, href: "/school", icon: School },
        ...(user?.role === "ADMIN" ? [{ name: "Admin", href: "/admin", icon: Settings }] : []),
    ];

    if (!user || pathname === "/login") return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-2xl bg-black/40 backdrop-blur-xl border-white/10">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 rounded-full bg-white/5 text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight hidden md:block">KazLib</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} href={item.href} className="relative group">
                                    <div className={cn(
                                        "p-2.5 md:p-3 rounded-full transition-all duration-300",
                                        isActive ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25" : "text-white/60 hover:text-white hover:bg-white/10"
                                    )}>
                                        <Icon size={20} className="md:w-5 md:h-5" strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    {/* Tooltip */}
                                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher className="hidden md:flex" />

                        {/* Profile Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold shadow-lg">
                                    {user.avatar}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-14 w-64 glass-panel rounded-2xl p-2 bg-black/90 border-white/10 flex flex-col gap-1 shadow-2xl"
                                        onMouseLeave={() => setIsProfileOpen(false)}
                                    >
                                        <div className="px-4 py-3 border-b border-white/10 mb-1">
                                            <p className="font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-white/50">{user.email}</p>
                                        </div>

                                        <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                                            <User size={18} /> {t.profile.title}
                                        </Link>
                                        <button onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full text-left">
                                            <Settings size={18} /> {t.nav.settings}
                                        </button>
                                        <div className="h-px bg-white/10 my-1" />

                                        <div className="px-4 py-2 flex items-center justify-between md:hidden">
                                            <span className="text-white/60 text-sm">Language</span>
                                            <LanguageSwitcher />
                                        </div>

                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full text-left"
                                        >
                                            <LogOut size={18} /> {t.nav.logout}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
