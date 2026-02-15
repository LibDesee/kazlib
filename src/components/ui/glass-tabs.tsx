"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
}

interface GlassTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function GlassTabs({ tabs, activeTab, onTabChange, className }: GlassTabsProps) {
    return (
        <div className={cn("flex p-1 bg-black/20 backdrop-blur-md rounded-full", className)}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "relative px-4 py-2 text-sm font-medium rounded-full transition-colors z-10 w-full",
                            isActive ? "text-white" : "text-white/60 hover:text-white/80"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-white/10 rounded-full border border-white/5 -z-10 shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
