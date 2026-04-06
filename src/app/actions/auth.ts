"use server";

import { prisma } from "@/lib/db";

export async function loginUser(name: string, password?: string) {
    try {
        const trimmedName = (name || "").trim();
        console.log(`[AUTH] Login attempt for: "${trimmedName}"`);
        
        let user = await prisma.user.findUnique({
            where: { name: trimmedName }
        });

        if (!user) {
            user = await prisma.user.findUnique({
                where: { name: trimmedName.toLowerCase() }
            });
        }

        if (!user) {
            console.warn(`[AUTH] User "${trimmedName}" not found in DB.`);
            return { success: false, error: "Пользователь не найден." };
        }

        const providedPassword = (password || "").trim();
        const storedPassword = (user.password || "").trim();

        if (storedPassword !== providedPassword) {
            console.warn(`[AUTH] Password mismatch for "${user.name}".`);
            return { success: false, error: "Неверный пароль." };
        }

        console.log(`[AUTH] Successful login for "${user.name}" (ID: ${user.id})`);
        return { success: true, user };
    } catch (error: any) {
        console.error('[AUTH] Critical login error:', error);
        return { success: false, error: "Ошибка сервера: " + error.message };
    }
}

export async function getUserProfile(userId: number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        return { success: !!user, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateLanguage(userId: number, language: string) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { language }
        });
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateProfileInDb(userId: number, data: any) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data
        });
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
