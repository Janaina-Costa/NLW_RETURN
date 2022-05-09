import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const HOST = 'http://localhost:'
const PORT = 3333



app.listen(process.env.PORT|| PORT, ()=>{
    console.log(`Running on port ${HOST}${PORT}...`)
    
})