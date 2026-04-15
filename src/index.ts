import 'dotenv/config'
import express from 'express';
import userRoutes from "./routes/user.routes.js"
const app = express()

app.use(express.json())
app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})