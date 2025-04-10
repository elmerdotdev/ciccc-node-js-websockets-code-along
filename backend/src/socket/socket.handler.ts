import { Server, Socket } from 'socket.io'
import { handleSocketEvents } from '../controllers/socket.controller'

export const socketHandler = (io: Server) => {
  const users: Record<string, string> = {}

  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`)
    handleSocketEvents(io, socket, users)
  })
}