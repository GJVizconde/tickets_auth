import { Request, Response } from 'express'
import { getConcert, createConcert, updateConcertData, getAllConcerts } from './concert.service'
import { Concert } from './concert.interface'
import { handleHttp } from '../../utils/error.handle'

const getConcerts = async (req: Request, res: Response) => {
  try {
    const response = await getAllConcerts()
    res.status(200).json(response)
  } catch (error: any) {
    handleHttp(res, 'ERROR_GET_CONCERTS', error.message)
  }
}

const createNewConcert = async ({ body }: Request, res: Response) => {
  try {
    const responseConcert = await createConcert(body)
    res.status(200).send(responseConcert)
  } catch (error: any) {
    handleHttp(res, 'ERROR_GET_CONCERT_BY_ID', error.message)
  }
}

const getConcertCtrl = async ({ params }: Request, res: Response) => {
  const { id } = params
  try {
    const response = await getConcert(+id)
    res.status(200).send('CONCERT_DETAIL')
  } catch (error: any) {
    handleHttp(res, 'ERROR_GET_CONCERT_BY_ID', error.message)
  }
}

const updateConcert = async ({ body, params }: Request, res: Response) => {
  const { id } = params
  try {
    const responseConcert = await updateConcertData(body as Concert, +id as number)

    res.status(200).json(responseConcert)
  } catch (error: any) {
    handleHttp(res, 'ERROR_UPDATE_CONCERT', error.message)
  }
}

export { getConcerts, getConcertCtrl, createNewConcert, updateConcert }
