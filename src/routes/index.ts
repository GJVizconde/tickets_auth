import { Router } from 'express'
import { readdirSync } from 'fs'

const router = Router()

const PATH_ROUTER = `${__dirname}`

const cleanFileName = (fileName: string) => {
  return fileName.split('.').shift()
}

readdirSync(PATH_ROUTER).filter(fileName => {
  const cleanName = cleanFileName(fileName)

  if (cleanName !== 'index') {
    import(`./${cleanName}`).then(moduleRouter => {
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }
