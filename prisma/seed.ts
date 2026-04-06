import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean existing data
  await prisma.grade.deleteMany()
  await prisma.scheduleSlot.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.calendarEvent.deleteMany()
  await prisma.message.deleteMany()
  await prisma.user.deleteMany()

  // Admin
  await prisma.user.create({
    data: {
      name: 'admin',
      password: '123456',
      role: 'ADMIN',
      avatar: '👑',
      language: 'RU',
      bio: 'System Administrator',
    },
  })

  // Teacher
  await prisma.user.create({
    data: {
      name: 'teacher',
      password: '123456',
      role: 'TEACHER',
      avatar: '👨‍🏫',
      language: 'RU',
      bio: 'Math and Physics Teacher',
    },
  })

  // Student
  await prisma.user.create({
    data: {
      name: 'student',
      password: '123456',
      role: 'STUDENT',
      avatar: '🎓',
      grade: '11A',
      school: 'NIS PhM Almaty',
      language: 'RU',
      bio: 'A hard working student.',
    },
  })

  // Seed some realistic grades
  const student = await prisma.user.findUnique({ where: { name: 'student' } })
  const teacher = await prisma.user.findUnique({ where: { name: 'teacher' } })

  if (student && teacher) {
    await prisma.grade.createMany({
      data: [
        // Algebra
        { studentId: student.id, teacherId: teacher.id, subject: "Algebra", type: "FO", value: 9, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "Algebra", type: "FO", value: 10, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "Algebra", type: "FO", value: 8, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "Algebra", type: "SOR", value: 14, max: 15 },
        { studentId: student.id, teacherId: teacher.id, subject: "Algebra", type: "SOCH", value: 35, max: 40 },
        // Physics
        { studentId: student.id, teacherId: teacher.id, subject: "Physics", type: "FO", value: 10, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "Physics", type: "FO", value: 10, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "Physics", type: "SOR", value: 13, max: 15 },
        { studentId: student.id, teacherId: teacher.id, subject: "Physics", type: "SOCH", value: 38, max: 40 },
        // History
        { studentId: student.id, teacherId: teacher.id, subject: "History", type: "FO", value: 8, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "History", type: "FO", value: 9, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "History", type: "FO", value: 10, max: 10 },
        { studentId: student.id, teacherId: teacher.id, subject: "History", type: "SOR", value: 15, max: 20 },
        { studentId: student.id, teacherId: teacher.id, subject: "History", type: "SOCH", value: 32, max: 40 },
      ]
    })
  }

  // Seed Schedule
  console.log('Seeding Schedule...')
  const days = [1, 2, 3, 4, 5] // Monday to Friday
  const subjects = ['Algebra', 'Physics', 'Chemistry', 'English', 'History', 'Biology', 'Literature', 'PE']
  
  for (const day of days) {
    for (let slot = 1; slot <= 8; slot++) {
      await prisma.scheduleSlot.create({
        data: {
          dayOfWeek: day,
          slotOrder: slot,
          subject: subjects[(day + slot) % subjects.length],
          room: `Room ${100 + (day * 10) + slot}`,
          class: '11A',
          teacherId: teacher?.id
        }
      })
    }
  }

  // Seed Cafeteria
  console.log('Seeding Cafeteria...')
  await prisma.menuItem.createMany({
    data: [
      { name: 'Beef Lagman', category: 'Hot', price: 1200, description: 'Traditional Uyghur dish' },
      { name: 'Chicken Salad', category: 'Salad', price: 800, description: 'Fresh vegetables and grilled chicken' },
      { name: 'Borscht Soup', category: 'Hot', price: 600, description: 'Classic beetroot soup' },
      { name: 'Berry Compote', category: 'Drinks', price: 150, description: 'Sweet homemade drink' },
      { name: 'Snickers', category: 'Snacks', price: 300, description: 'Chocolate bar' }
    ]
  })

  // Seed Calendar Events
  console.log('Seeding Calendar...')
  const today = new Date()
  await prisma.calendarEvent.createMany({
    data: [
      {
        title: 'Science Fair',
        description: 'Annual school science fair in the main hall.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0)
      },
      {
        title: 'Parent Meeting',
        description: 'General parent meeting for 11th grade.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 18, 0)
      },
      {
        title: 'Midterm Exams',
        description: 'First semester midterm examinations begin.',
        date: new Date(today.getFullYear(), today.getMonth() + 1, 10, 8, 0)
      }
    ]
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
