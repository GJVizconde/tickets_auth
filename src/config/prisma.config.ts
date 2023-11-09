import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function connectToDatabase() {
  const prisma = new PrismaClient()

  try {
    await prisma.$connect()
    return prisma
  } catch (error) {
    console.error('An error ocurred during database conection', error)
    throw error
  }
}

async function disconnectPrisma() {
  await prisma.$disconnect()
}

export { prisma, disconnectPrisma, connectToDatabase }
