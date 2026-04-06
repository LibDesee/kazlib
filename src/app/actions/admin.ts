"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Users ---
export async function getUsers() {
    return prisma.user.findMany({ orderBy: { id: 'asc' } });
}

export async function createUser(data: any) {
    return prisma.user.create({ data });
}

export async function updateUser(id: number, data: any) {
    return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
    // Delete related first
    await prisma.grade.deleteMany({ where: { OR: [{ studentId: id }, { teacherId: id }] }});
    await prisma.message.deleteMany({ where: { OR: [{ senderId: id }, { receiverId: id }] }});
    await prisma.scheduleSlot.deleteMany({ where: { teacherId: id }});
    return prisma.user.delete({ where: { id } });
}

// --- Schedule ---
export async function updateScheduleSlot(id: number, data: any) {
    return prisma.scheduleSlot.update({ where: { id }, data });
}

// --- Menu ---
export async function createMenuItem(data: any) {
    return prisma.menuItem.create({ data });
}

export async function deleteMenuItem(id: number) {
    return prisma.menuItem.delete({ where: { id } });
}

export async function updateMenuItem(id: number, data: any) {
    return prisma.menuItem.update({ where: { id }, data });
}

// --- Calendar ---
export async function createCalendarEvent(data: any) {
    return prisma.calendarEvent.create({ data });
}

export async function deleteCalendarEvent(id: number) {
    return prisma.calendarEvent.delete({ where: { id } });
}

export async function updateCalendarEvent(id: number, data: any) {
    return prisma.calendarEvent.update({ where: { id }, data });
}
