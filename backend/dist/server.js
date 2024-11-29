"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
const ioServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(ioServer, {
    cors: {
        origin: 'http://localhost:4321', // Astro frontend
        methods: ["GET", "POST"]
    }
});
app.get('/welcome', (req, res) => {
    res.status(200).send('Welcome to server');
});
// Socket.io
const users = {};
io.on('connection', (socket) => {
    // On connect
    console.log(`A new user has joined with id: ${socket.id}`);
    // Listen for new messages and send to all clients
    socket.on('chat', (data) => {
        console.log(`${data.username} has sent "${data.message}"`);
        users[socket.id] = data.username;
        io.emit('chat', data); // Sent to all connected clients
    });
    // Disconnect
    socket.on('disconnect', () => {
        var _a;
        console.log(`${socket.id} has disconnected`);
        io.emit('chat', { username: 'System', message: `${(_a = users[socket.id]) !== null && _a !== void 0 ? _a : socket.id} has left` });
    });
});
// Start server
const PORT = process.env.PORT || 3000;
ioServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
