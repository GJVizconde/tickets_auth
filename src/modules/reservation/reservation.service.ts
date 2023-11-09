import { disconnectPrisma, prisma } from '../../config/prisma.config'
import { readJsonFile, writeJsonFile } from '../../utils/file.handle'
import { incrementalNumber } from '../../utils/getIdnumber.handle'
import { updateConcertData } from '../concert/concert.service'
import { Reservation } from './reservation.interface'

const getAllReservations = async () => {
  try {
    const reservations = await prisma.reservation.findMany({})

    return reservations
  } catch (error) {
    throw error
  }
}

const createReservation = async ({ quantity, status, concertId }: Reservation) => {
  try {
    const concertData = await prisma.concert.findUnique({
      where: { id: +concertId }
    })

    if (parseInt(`${concertData?.stock}`) <= 0) throw new Error('Out of stock')

    const customIncremetalId = await incrementalNumber()

    const stockAvailable = concertData?.stock

    if (quantity <= 0) {
      throw new Error('Must be greater than zero')
    }

    if (quantity > parseInt(`${stockAvailable}`)) {
      throw new Error(`Reservations must be lower than ${stockAvailable}`)
    }

    const pendingReservation: Reservation = {
      id: customIncremetalId,
      quantity: +quantity,
      status,
      concertId,
      createAt: `${new Date().toISOString()}`,
      updatedAt: `${new Date().toISOString()}`
    }

    const data = await readJsonFile()

    data.pendingReservations.push(pendingReservation)

    await writeJsonFile(data)
    let stock = parseInt(`${stockAvailable}`) - pendingReservation.quantity

    await updateConcertData({ stock }, concertId)

    return pendingReservation
  } catch (error) {
    throw error
  }
}

const confirmReservationStatus = async (updateData: Partial<Reservation>, id: string) => {
  try {
    let data = await readJsonFile()
    const pendingReservations = data.pendingReservations

    const reservationExist: Reservation = pendingReservations.find(
      (reservation: Partial<Reservation>) => reservation.id === +id
    )

    if (!reservationExist) throw new Error('Reservation does not exist or reached out time')

    const elapsedTime = (reservationTime: string) => {
      const now = new Date()
      const reservationCreatedAt = new Date(reservationTime)
      const milisecs: number = now.getTime() - reservationCreatedAt.getTime()
      const minutes: number = milisecs / (1000 * 60)
      return minutes
    }

    const availableReservations = (data: Reservation[]): Reservation[] => {
      const validReservations = data.filter(reservation => {
        const minutes = elapsedTime(`${reservation.createAt}`)
        return minutes < 1
      })

      return validReservations
    }

    if (elapsedTime(`${reservationExist.createAt}`) > 1) {
      const validReservations = availableReservations(pendingReservations)

      data.pendingReservations = validReservations

      await writeJsonFile(data)

      throw new Error('Reservation reached time out')
    }

    reservationExist.status = true

    await prisma.reservation.create({
      data: reservationExist
    })

    data.pendingReservations = data.pendingReservations.filter(
      (reservation: Reservation) => reservation.id !== +id
    )

    await writeJsonFile(data)

    //TODO: "Luego de confirmar la reserva en db y eliminarla del Json File, sumar quantity to stock"

    const concert = await prisma.concert.findUnique({
      where: {
        id: reservationExist.concertId
      },
      select: {
        stock: true
      }
    })

    console.log(concert?.stock)

    return reservationExist
  } catch (error) {
    throw error
  } finally {
    await disconnectPrisma()
  }
}

const pendingReservations = async () => {
  try {
    const data = await readJsonFile()
    return data.pendingReservations
  } catch (error) {
    throw error
  }
}

const deleteReservationFromDB = async (id: string) => {
  //TODO: "Terminar cancelacion de reserva, confirmada o no y al efectuar la cancelacion sumar el quantity al stock"
  try {
    const reservation = await prisma.reservation.delete({
      where: {
        id: +id
      }
    })
    return reservation
  } catch (error) {
    throw error
  }
}

export {
  createReservation,
  getAllReservations,
  confirmReservationStatus,
  pendingReservations,
  deleteReservationFromDB
}
