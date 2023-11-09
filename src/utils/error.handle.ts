import { Response } from 'express'

const handleHttp = (res: Response, customError: string, errorRaw?: any) => {
  console.log(customError)
  res.status(400).send({ error: errorRaw })
}

export { handleHttp }
