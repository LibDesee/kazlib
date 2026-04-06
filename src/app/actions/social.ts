"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getContacts(currentUserId: number, currentUserRole: string) {
    try {
        let contacts;

        if (currentUserRole === "STUDENT") {
            // Students can only see TEACHER and ADMIN
            contacts = await prisma.user.findMany({
                where: {
                    role: { in: ["TEACHER", "ADMIN"] },
                    id: { not: currentUserId }
                },
                select: { id: true, name: true, role: true, avatar: true }
            });
        } else {
            // Admin and Teacher can see everyone
            contacts = await prisma.user.findMany({
                where: { id: { not: currentUserId } },
                select: { id: true, name: true, role: true, avatar: true, grade: true }
            });
        }

        return contacts;
    } catch (error) {
        console.error("Failed to fetch contacts:", error);
        return [];
    }
}

export async function getMessages(currentUserId: number, otherUserId: number) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: currentUserId }
                ]
            },
            orderBy: { createdAt: 'asc' }
        });
        return messages;
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
}

export async function sendMessage(senderId: number, receiverId: number, content: string) {
    try {
        const message = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content
            }
        });
        return message;
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
}
