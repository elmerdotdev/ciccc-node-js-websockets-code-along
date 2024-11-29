import express, { Request, Response} from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

// Create server
const app = express()
const ioServer = createServer(app)
const io = new Server(ioServer, {
  cors: {
    origin: 'http://localhost:4321', // Astro frontend
    methods: ["GET", "POST"]
  }
})

app.get('/welcome', (req: Request, res: Response) => {
  res.status(200).send('Welcome to server')
})

// Socket.io
const users: Record<string, string> = {}

io.on('connection', (socket) => {
  // On connect
  console.log(`A new user has joined with id: ${socket.id}`)

  // Listen for new messages and send to all clients
  socket.on('chat', (data) => {
    console.log(`${data.username} has sent "${data.message}"`)
    users[socket.id] = data.username
    io.emit('chat', data) // Sent to all connected clients
  })

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`)
    io.emit('chat', { username: 'System', message: `${users[socket.id] ?? socket.id} has left`})
  })
})

// Start server
const PORT = process.env.PORT || 3000
ioServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`)
})