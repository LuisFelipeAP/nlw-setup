import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const firstHabitId = '4a461d30-9f57-11ed-a8fc-0242ac120002'
const firstHabitCreationDate = new Date('2023-01-28T03:00:00.000')

const secondHabitId = '9678b212-9f57-11ed-a8fc-0242ac120002'
const secondHabitCreationDate = new Date('2023-01-29T03:00:00.000')

const thirdHabitId = '9b2b481a-9f57-11ed-a8fc-0242ac120002'
const thirdHabitCreationDate = new Date('2023-01-30T03:00:00.000')

async function run() {
    await prisma.habit.deleteMany()
    await prisma.day.deleteMany()

    await Promise.all([
        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: 'Beber 2L água',
                created_at: firstHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: 'Academia',
                created_at: secondHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 },
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: 'Dormir 8h',
                created_at: thirdHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 },
                    ]
                }
            }
        })
    ])

    await Promise.all([
        prisma.day.create({
            data: {
                date: new Date('2023-01-23T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                date: new Date('2023-01-25T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    }
                }
            }
        }),

        prisma.day.create({
            data: {
                date: new Date('2023-01-27T03:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ]
                }
            }
        })
    ])
}

run().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
