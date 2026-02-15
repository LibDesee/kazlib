"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, type, label, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && <label className="text-sm font-medium text-white/70 ml-2">{label}</label>}
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-2xl glass-panel bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
GlassInput.displayName = "GlassInput";

export { GlassInput };
