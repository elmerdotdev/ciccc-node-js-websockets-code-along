import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { handleRoomSockets } from './socket/room.handler'

dotenv.config()

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4321",
    methods: ["GET", "POST"]
  }
})

handleRoomSockets(io)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Room server running on port ${PORT}`)
})