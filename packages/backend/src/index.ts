import 'dotenv/config'
import express from 'express';
import { UserRoutes } from './routes/user.routes.js';
import { ClientRoutes } from './routes/client.routes.js';
const app = express()
const router = express.Router()

UserRoutes(router)
ClientRoutes(router)

app.use(express.json())
app.use('/users', router)
app.use('/clients', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})