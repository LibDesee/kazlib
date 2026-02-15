"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface UserProfile {
    name: string;
    role: "Student" | "Teacher";
    grade: string;
    school: string;
    avatar: string;
    email: string;
    phone: string;
    interests: string[];
}

interface AuthContextType {
    user: UserProfile | null;
    login: (name: string) => void;
    logout: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock initial user data
const MOCK_USER: UserProfile = {
    name: "Alikhan B.",
    role: "Student",
    grade: "11A",
    school: "NIS PhM Almaty",
    avatar: "AB",
    email: "alikhan.b@school.kz",
    phone: "+7 777 123 45 67",
    interests: ["Math", "Physics", "basketball"],
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Check for existing session (mock)
    useEffect(() => {
        const storedUser = localStorage.getItem("kazlib_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Protect Routes
    useEffect(() => {
        const isLoginPage = pathname === "/login";
        const isPublic = pathname === "/about"; // Example public route if needed

        if (!user && !isLoginPage && !isPublic) {
            // Allow a small delay for hydration check or just redirect
            // For MVP, we'll wait for the initial effect to run. 
            // However, relying on localstorage effect might cause a flash.
            // We'll trust the user state. If user is null and we are not on login, redirect.
            // But we need to be careful about the initial render where user is null before useEffect runs.
            // We can check localStorage synchronously if possible, or use a "loading" state.
        }
    }, [user, pathname]);

    // Better Route Protection Logic handling the async nature of useEffect
    useEffect(() => {
        // If we are on client
        const stored = localStorage.getItem("kazlib_user");
        if (!stored && pathname !== "/login") {
            router.push("/login");
        } else if (stored && pathname === "/login") {
            router.push("/");
        }
    }, [pathname, router]);

    const login = (name: string) => {
        // Determine mock profile based on input, for now just use default
        const newUser = { ...MOCK_USER, name: name || MOCK_USER.name };
        setUser(newUser);
        localStorage.setItem("kazlib_user", JSON.stringify(newUser));
        router.push("/");
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
