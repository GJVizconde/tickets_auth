import { Request, Response } from 'express'
import {
  confirmReservationStatus,
  createReservation,
  deleteReservationFromDB,
  getAllReservations,
  pendingReservations
} from './reservation.service'
import { Reservation } from './reservation.interface'
import { handleHttp } from '../../utils/error.handle'

const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await getAllReservations()

    res.status(200).json(reservations)
  } catch (error) {
    handleHttp(res, 'ERROR_GET RESERVATION')
  }
}

const createNewReservation = async ({ body }: Request, res: Response) => {
  try {
    const response = await createReservation(body as Reservation)
    res.status(200).send(response)
  } catch (error: any) {
    handleHttp(res, 'ERROR_GET RESERVATION', error.message)
  }
}

const getPendingReservations = async (req: Request, res: Response) => {
  try {
    const response = await pendingReservations()

    res.status(200).json(response)
  } catch (error) {
    handleHttp(res, 'ERROR_RETRIEVE_PENDING_RESERVATIONS', error)
  }
}

const confirmReservation = async ({ body, params }: Request, res: Response) => {
  const { id } = params
  try {
    const response = await confirmReservationStatus(body as Reservation, id as string)
    res.status(200).json(response)
  } catch (error: any) {
    handleHttp(res, 'ERROR_CONFIRM_RESERVATION', error.message)
  }
}

const deleteReservation = async ({ params }: Request, res: Response) => {
  const { id } = params
  try {
    const response = await deleteReservationFromDB(id as string)
    res.status(200).json(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GET RESERVATION', error)
  }
}

export {
  getReservations,
  createNewReservation,
  getPendingReservations,
  confirmReservation,
  deleteReservation
}
