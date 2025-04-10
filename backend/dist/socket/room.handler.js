"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomSockets = void 0;
const room_controller_1 = require("../controllers/room.controller");
const handleRoomSockets = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected to room server: ${socket.id}`);
        (0, room_controller_1.handleRoomEvents)(io, socket);
    });
};
exports.handleRoomSockets = handleRoomSockets;
