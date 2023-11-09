import { disconnectPrisma, prisma } from '../../config/prisma.config'
import { Concert } from './concert.interface'

const getAllConcerts = async () => {
  try {
    const concerts = prisma.concert.findMany({
      include: {
        reservations: true
      }
    })
    return concerts
  } catch (error: any) {
    throw Error(error)
  } finally {
    await disconnectPrisma()
  }
}

const createConcert = async ({ name, date, place, stock, ticketPrice }: Concert) => {
  try {
    const newDate = new Date(`${date}`)

    const concert = await prisma.concert.create({
      data: {
        name,
        date: newDate,
        place,
        stock,
        ticketPrice
      }
    })
    return concert
  } catch (error) {
    console.error(error)
  } finally {
    await disconnectPrisma()
  }
}

const getConcert = (id: number) => {}

const updateConcertData = async (updateData: Partial<Concert>, id: number) => {
  try {
    const updateConcert = await prisma.concert.update({
      where: {
        id: +id
      },
      data: {
        ...updateData
      }
    })

    return updateConcert
  } catch (error) {
    console.error(error)
  } finally {
    await disconnectPrisma()
  }
}

export { getAllConcerts, getConcert, createConcert, updateConcertData }
