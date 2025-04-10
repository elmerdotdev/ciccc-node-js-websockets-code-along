import { Server, Socket } from 'socket.io'
import { handleRoomEvents } from '../controllers/room.controller'

export const handleRoomSockets = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected to room server: ${socket.id}`)
    handleRoomEvents(io, socket)
  })
}