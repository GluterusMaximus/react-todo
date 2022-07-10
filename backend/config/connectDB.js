import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI)
    console.log(`Mongodb connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`)
    process.exit(1)
  }
}
export default connectDB
