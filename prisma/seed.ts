import { prisma } from '../src/config/prisma.config'
import { getConcertsData, getReservationsData } from './seedData/'

async function main() {
  const concertsData = await getConcertsData()
  const reservationsData = await getReservationsData()

  await prisma.concert.createMany({
    data: concertsData
  })

  await prisma.reservation.createMany({
    data: reservationsData
  })
}

main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect
  })
