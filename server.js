import express from "express";
import chatMessage from "./utils/chatMessage.js";
import loadChats from "./utils/loadChats.js";
import http from "http";

import { Server } from "socket.io";

import { userJoin, getCurrentUser, getRoomUsers, userLeave } from "./utils/users.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

import logger from "./utils/logger.js";
import messageFormatter from "./utils/messageFormatter.js";

app.use(express.static("public"));
const bot = "chat_BOT";
io.on("connection", (socket) => {
	logger.info("New WebSocket Connection ....");
	socket.on("joinRoom", ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		socket.emit("loadChats", loadChats(user.room));

		socket.broadcast
			.to(user.room)
			.emit("message", messageFormatter(bot, `${user.username} has joined the chat`));
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});
	socket.on("disconnect", () => {
		const user = userLeave(socket.id);
		if (!user) return;

		io.to(user.room).emit("message", messageFormatter(bot, `${user.username} has left the chat`));
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(socket.id);
		if (!user) return;

		io.to(user.room).emit("message", chatMessage(user.room, user.username, msg));
	});
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
	logger.info(`App is listening on Port ${port}`);
});
