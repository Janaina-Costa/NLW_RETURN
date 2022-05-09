import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const HOST = 'http://localhost:'
const port = 3333



app.listen(process.env.PORT|| port, ()=>{
    console.log(`Running on port ${HOST}${port}...`)
    
})