"use server";

import { PrismaClient, Grade } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStudents() {
    try {
        return await prisma.user.findMany({
            where: { role: "STUDENT" },
            select: { id: true, name: true, grade: true }
        });
    } catch (error) {
        return [];
    }
}

export async function getStudentGrades(studentId: number) {
    try {
        const grades = await prisma.grade.findMany({
            where: { studentId },
            orderBy: { createdAt: 'asc' }
        });
        
        // Group by subject
        const subjectsMap = new Map<string, any>();
        
        grades.forEach((g: Grade) => {
            if (!subjectsMap.has(g.subject)) {
                subjectsMap.set(g.subject, {
                    id: g.subject, // using subject name as id for simplicity
                    name: g.subject,
                    fa: [],
                    sas: [],
                    sat: { score: 0, max: 40 }
                });
            }
            
            const sub = subjectsMap.get(g.subject);
            
            if (g.type === "FO") {
                sub.fa.push({ id: g.id, score: g.value, max: 10 });
            } else if (g.type === "SOR") {
                sub.sas.push({ id: g.id, score: g.value, max: g.max });
            } else if (g.type === "SOCH") {
                sub.sat = { id: g.id, score: g.value, max: g.max };
            }
        });
        
        return Array.from(subjectsMap.values());
    } catch (error) {
        console.error("Failed to fetch grades:", error);
        return [];
    }
}

export async function saveGrade(studentId: number, teacherId: number, subject: string, type: string, value: number, max: number = 100) {
    try {
        // If it's a SOCH, there is only one per subject per student. Let's upsert or delete existing?
        // Let's just create new ones or delete depending on requirements, but this API just adds individual grades.
        const grade = await prisma.grade.create({
            data: {
                studentId,
                teacherId,
                subject,
                type,
                value,
                max
            }
        });
        return { success: true, grade };
    } catch (error) {
        console.error("Failed to save grade:", error);
        return { success: false, error: "Failed to save grade" };
    }
}

export async function deleteGrade(gradeId: number) {
    try {
        await prisma.grade.delete({
            where: { id: gradeId }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to delete grade:", error);
        return { success: false, error: "Failed to delete grade" };
    }
}

export async function updateGradeValue(gradeId: number, value: number, max: number) {
    try {
        await prisma.grade.update({
            where: { id: gradeId },
            data: { value, max }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to update grade:", error);
        return { success: false, error: "Failed to update grade" };
    }
}

export async function createSubject(studentId: number, teacherId: number, subject: string) {
    try {
        await prisma.grade.create({
            data: {
                studentId,
                teacherId,
                subject,
                type: "FO",
                value: 0,
                max: 10
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to create subject:", error);
        return { success: false, error: "Failed to create subject" };
    }
}

export async function deleteSubjectByName(studentId: number, subject: string) {
    try {
        await prisma.grade.deleteMany({
            where: {
                studentId,
                subject
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to delete subject:", error);
        return { success: false, error: "Failed to delete subject" };
    }
}
