import app from './src/app'
import { PORT } from './src/config/env.config'

const port = PORT || 3001

//TODO: Desplegar en AWS
//TODO: Probar manejar entorno Production and development with Prisma

app.listen(port, () => {
  console.log('Listening on port %s', port)
})
