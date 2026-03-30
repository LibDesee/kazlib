"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "glass";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

export function GlassButton({
    children,
    className,
    variant = "glass",
    size = "md",
    loading = false,
    disabled,
    ...props
}: GlassButtonProps) {

    const variants = {
        primary: "bg-accent-primary text-white hover:bg-accent-primary/80 shadow-lg shadow-accent-primary/20",
        secondary: "bg-accent-secondary text-white hover:bg-accent-secondary/80 shadow-lg shadow-accent-secondary/20",
        glass: "glass-button text-white hover:bg-white/10",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg font-semibold",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={loading || disabled ? {} : { scale: 1.05 }}
            disabled={loading || (disabled as boolean)}
            className={cn(
                "rounded-full transition-all duration-300 flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                (loading || disabled) && "opacity-50 cursor-not-allowed",
                className
            )}
            {...props}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                </div>
            ) : children}
        </motion.button>
    );
}
