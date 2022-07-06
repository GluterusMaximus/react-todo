import {} from 'dotenv/config'
import express from 'express'
import connectDB from './config/connectDB.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorMiddleware from './middleware/errorMiddleware.js'

connectDB()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use('/api/users', userRouter)
app.use('/', (req, res) => {
  res.send('Api is running...')
})

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running'))
