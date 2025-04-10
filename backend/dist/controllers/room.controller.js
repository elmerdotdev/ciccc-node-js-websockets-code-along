"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomEvents = void 0;
const handleRoomEvents = (io, socket) => {
    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`);
    });
    socket.on('message', (data) => {
        io.emit('message', data);
    });
    socket.on('join room', (data) => {
        socket.join(data.room);
        console.log(`${data.username} joined room ${data.room}`);
        io.to(data.room).emit('message', {
            text: `${data.username} joined the room ${data.room}`,
            username: 'System',
            room: data.room
        });
    });
    socket.on('leave room', (data) => {
        socket.leave(data.room);
        console.log(`${data.username} left room ${data.room}`);
        io.to(data.room).emit('message', {
            text: `${data.username} has left the room ${data.room}`,
            username: 'System',
            room: data.room
        });
    });
};
exports.handleRoomEvents = handleRoomEvents;
