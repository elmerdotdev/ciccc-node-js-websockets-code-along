import { Server, Socket } from 'socket.io'

interface RoomPayload {
  username: string
  room: string
}

interface MessagePayload {
  text: string
  username: string
  room: string
}

export const handleRoomEvents = (io: Server, socket: Socket) => {
  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`)
  })

  socket.on('message', (data: MessagePayload) => {
    io.emit('message', data)
  })

  socket.on('join room', (data: RoomPayload) => {
    socket.join(data.room)
    console.log(`${data.username} joined room ${data.room}`)
    io.to(data.room).emit('message', {
      text: `${data.username} joined the room ${data.room}`,
      username: 'System',
      room: data.room
    })
  })

  socket.on('leave room', (data: RoomPayload) => {
    socket.leave(data.room)
    console.log(`${data.username} left room ${data.room}`)
    io.to(data.room).emit('message', {
      text: `${data.username} has left the room ${data.room}`,
      username: 'System',
      room: data.room
    })
  })
}