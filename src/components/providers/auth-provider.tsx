"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loginUser, getUserProfile } from "@/app/actions/auth";

export interface UserProfile {
    id: number;
    name: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
    grade: string | null;
    school: string | null;
    avatar: string | null;
    email: string | null;
    phone: string | null;
    interests: string | null;
    language: string;
}

interface AuthContextType {
    user: UserProfile | null;
    login: (name: string, password?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedUser = localStorage.getItem("kazlib_user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                getUserProfile(parsed.id).then(res => {
                    if (res.success && res.user) {
                        setUser(res.user as UserProfile);
                    } else {
                        localStorage.removeItem("kazlib_user");
                        setUser(null);
                        router.push("/login");
                    }
                });
            } catch (e) {
                localStorage.removeItem("kazlib_user");
                router.push("/login");
            }
        }
    }, [router]);

    useEffect(() => {
        const stored = localStorage.getItem("kazlib_user");
        if (!stored && pathname !== "/login") {
            router.push("/login");
        } else if (stored && pathname === "/login") {
            router.push("/");
        }
    }, [pathname, router]);

    const login = async (name: string, password?: string) => {
        const res = await loginUser(name, password);
        if (res.success && res.user) {
            const newUser = res.user as UserProfile;
            setUser(newUser);
            localStorage.setItem("kazlib_user", JSON.stringify(newUser));
            router.push("/");
            return { success: true };
        }
        return { success: false, error: res.error };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("kazlib_user");
        router.push("/login");
    };

    const updateProfile = (data: Partial<UserProfile>) => {
        if (!user) return;
        const updated = { ...user, ...data };
        setUser(updated);
        localStorage.setItem("kazlib_user", JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
