import { disconnectPrisma, prisma } from '../config/prisma.config'
import { readJsonFile } from './file.handle'

export const incrementalNumber = async () => {
  const dataJson = await readJsonFile()

  let idReserved: number[] = []
  let incrementalId: number = 1

  dataJson.reservations.map((e: any) => idReserved.push(e.id))

  dataJson.pendingReservations.map((e: any) => idReserved.push(e.id))

  const dbRerservationsIds = async (array: number[]) => {
    try {
      const reservations = await prisma.reservation.findMany({
        select: {
          id: true
        }
      })

      reservations.map(reservation => array.push(reservation.id))

      return array
    } catch (error) {
      throw error
    } finally {
      await disconnectPrisma()
    }
  }

  idReserved = await dbRerservationsIds(idReserved)

  for (let i = 0; i < idReserved.length; i++) {
    if (idReserved.includes(incrementalId)) {
      incrementalId++
    }
  }

  return incrementalId
}
