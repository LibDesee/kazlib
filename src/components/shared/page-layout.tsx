"use client";

import { Navigation } from "./navigation";
import { motion } from "framer-motion";

export function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/20 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <Navigation />

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
            >
                {children}
            </motion.main>
        </div>
    );
}
