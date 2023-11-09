import { Router } from 'express'
import {
  createNewConcert,
  getConcertCtrl,
  getConcerts,
  updateConcert
} from '../modules/concert/concert.controller'

const router = Router()

router.get('/', getConcerts)
router.post('/', createNewConcert)
router.get('/:id', getConcertCtrl)
router.patch('/:id', updateConcert)

export { router }
