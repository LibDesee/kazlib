"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LanguageSwitcherProps {
    className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={cn("flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5", className)}>
            <button
                onClick={() => setLanguage("en")}
                className={cn(
                    "relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 z-10",
                    language === "en" ? "text-white" : "text-white/40 hover:text-white/80"
                )}
            >
                {language === "en" && (
                    <motion.div
                        layoutId="active-lang"
                        className="absolute inset-0 bg-accent-primary rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                EN
            </button>
            <button
                onClick={() => setLanguage("ru")}
                className={cn(
                    "relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 z-10",
                    language === "ru" ? "text-white" : "text-white/40 hover:text-white/80"
                )}
            >
                {language === "ru" && (
                    <motion.div
                        layoutId="active-lang"
                        className="absolute inset-0 bg-accent-primary rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                RU
            </button>
        </div>
    );
}
