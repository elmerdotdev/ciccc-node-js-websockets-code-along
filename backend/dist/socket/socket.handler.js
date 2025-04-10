"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const socket_controller_1 = require("../controllers/socket.controller");
const socketHandler = (io) => {
    const users = {};
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        (0, socket_controller_1.handleSocketEvents)(io, socket, users);
    });
};
exports.socketHandler = socketHandler;
