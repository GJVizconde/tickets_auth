import { readJsonFile } from '../../src/utils/file.handle'

let data: any = {}

export const getConcertsData = async () => {
  try {
    data = await readJsonFile()

    const Concerts = data.concerts
    return Concerts
  } catch (error) {
    throw error
  }
}
