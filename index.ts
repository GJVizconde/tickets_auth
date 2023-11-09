import app from './src/app'
import { PORT } from './src/config/env.config'

const port = PORT || 3001

app.listen(port, () => {
  console.log('Listening on port %s', port)
})
