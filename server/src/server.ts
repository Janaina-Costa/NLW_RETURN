import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const HOST = 'http://localhost:'



app.listen(process.env.PORT, ()=>{
    console.log(`Running on port ${HOST}${process.env.PORT}...`)
    
})