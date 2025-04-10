import { Server, Socket } from 'socket.io'

interface ChatPayload {
  username: string
  message: string
}

export const handleSocketEvents = (
  io: Server,
  socket: Socket,
  users: Record<string, string>
) => {
  socket.on('chat', (data: ChatPayload) => {
    console.log(`${data.username} sent: "${data.message}"`)
    users[socket.id] = data.username
    io.emit('chat', data)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    io.emit('chat', {
      username: 'System',
      message: `${users[socket.id] ?? socket.id} has left`
    })
  })
}