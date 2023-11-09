import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import { Reservation } from '../modules/reservation/reservation.interface'

export const readFiles = promisify(readFile)
export const writeFiles = promisify(writeFile)

export const readJsonFile = async () => {
  let data: any = {}
  try {
    const fileData = await readFiles('./public/concerts.json', 'utf-8')
    data = JSON.parse(fileData)
    return data
  } catch (error) {
    throw error
  }
}

export const writeJsonFile = async (data: Reservation) => {
  const dataJson = JSON.stringify(data, null, 2)
  try {
    const writeData = await writeFiles('./public/concerts.json', dataJson)
    return writeData
  } catch (error) {
    throw error
  }
}

export const writeJsonFilePendingReservations = async (data: Reservation[]) => {
  const dataJson = JSON.stringify(data, null, 2)
  try {
    const writeData = await writeFiles('./public/concerts.json', dataJson)
    return writeData
  } catch (error) {
    throw error
  }
}
