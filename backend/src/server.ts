import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import routes from './routes/index.routes'
import { socketHandler } from './socket/socket.handler'

dotenv.config()

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4321',
    methods: ['GET', 'POST']
  }
})

// Middleware and routes
app.use(express.json())
app.use('/', routes)

// Handle sockets
socketHandler(io)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})