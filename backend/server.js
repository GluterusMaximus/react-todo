import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(errorMiddleware)

app.use('/api/users', userRoutes)
app.use('/', (req, res) => {
  res.send('Api is running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running'))
