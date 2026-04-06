"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Schedule Actions ---
export async function getScheduleByClass(className: string) {
    try {
        const schedule = await prisma.scheduleSlot.findMany({
            where: { class: className },
            orderBy: [{ dayOfWeek: 'asc' }, { slotOrder: 'asc' }]
        });
        return schedule;
    } catch (error) {
        console.error("Failed to fetch schedule:", error);
        return [];
    }
}

export async function getScheduleByTeacher(teacherId: number) {
    try {
        const schedule = await prisma.scheduleSlot.findMany({
            where: { teacherId },
            orderBy: [{ dayOfWeek: 'asc' }, { slotOrder: 'asc' }]
        });
        return schedule;
    } catch (error) {
        console.error("Failed to fetch teacher schedule:", error);
        return [];
    }
}

// --- Menu Actions ---
export async function getMenu() {
    try {
        const menu = await prisma.menuItem.findMany({
            orderBy: { category: 'asc' }
        });
        return menu;
    } catch (error) {
        console.error("Failed to fetch menu:", error);
        return [];
    }
}

// --- Calendar Actions ---
export async function getCalendarEvents() {
    try {
        const events = await prisma.calendarEvent.findMany({
            orderBy: { date: 'asc' }
        });
        return events;
    } catch (error) {
        console.error("Failed to fetch calendar events:", error);
        return [];
    }
}
