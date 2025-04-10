"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketEvents = void 0;
const handleSocketEvents = (io, socket, users) => {
    socket.on('chat', (data) => {
        console.log(`${data.username} sent: "${data.message}"`);
        users[socket.id] = data.username;
        io.emit('chat', data);
    });
    socket.on('disconnect', () => {
        var _a;
        console.log(`User disconnected: ${socket.id}`);
        io.emit('chat', {
            username: 'System',
            message: `${(_a = users[socket.id]) !== null && _a !== void 0 ? _a : socket.id} has left`
        });
    });
};
exports.handleSocketEvents = handleSocketEvents;
