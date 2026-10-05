import express from 'express'
import cors from 'cors'
import palestranteRouter from '../src/routes/palestranteRouter'
import eventoRouter from './routes/eventoRouter'

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]
}))
app.use(express.json())
app.use("/api/palestrante", palestranteRouter)
 
app.use("/api/evento", eventoRouter)
 
app.listen(3000, () => {
  console.log('Servidor está rodando na porta 3000')
})