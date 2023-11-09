import { Router } from 'express'
import {
  confirmReservation,
  createNewReservation,
  deleteReservation,
  getPendingReservations,
  getReservations
} from '../modules/reservation/reservation.controller'

const router = Router()

router.get('/', getReservations)
router.delete('/:id', deleteReservation)

router.patch('/confirm/:id', confirmReservation)
router.get('/pending', getPendingReservations)
router.post('/pending', createNewReservation)

export { router }
