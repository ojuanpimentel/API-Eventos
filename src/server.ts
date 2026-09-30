import express from 'express'
import palestranteRouter from '../src/routes/palestranteRouter'
import eventoRouter from './routes/eventoRouter'
 
const app = express()
 
app.use(express.json())
app.use("/api/palestrante", palestranteRouter)
 
app.use("/api/evento", eventoRouter)
 
app.listen(3000, () => {
  console.log('Servidor está rodando na porta 3000')
})