import { readFiles, readJsonFile } from '../../src/utils/file.handle'

let data: any = {}

export async function getReservationsData() {
  try {
    const data = await readJsonFile()

    const Reservations = data.reservations
    return Reservations
  } catch (error) {
    throw error
  }
}
