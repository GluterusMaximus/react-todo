import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())

app.use('/users', userRoutes)
app.use('/', (req, res) => {
  res.send('Api is running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running'))
