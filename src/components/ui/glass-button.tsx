"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "glass";
    size?: "sm" | "md" | "lg";
}

export function GlassButton({
    children,
    className,
    variant = "glass",
    size = "md",
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
            whileHover={{ scale: 1.05 }}
            className={cn(
                "rounded-full transition-all duration-300 flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
