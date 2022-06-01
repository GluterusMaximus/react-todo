import express from 'express'

const app = express()

const PORT = process.env.PORT || 5000

console.log(process.env.PORT)

app.listen(PORT, console.log('Server running'))
