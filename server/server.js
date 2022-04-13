// Environment
require('dotenv').config({ path: '../.env' });

// Imports---------------------------------------------------------------------
// - Packages
const cors = require('cors');
const express = require('express');
const colors = require('colors');
// - Middlewares
const { notFound, errorHandler } = require("./app/middlewares/errorHandler");
// - Connections
const dbConnection = require('./config/mongo');
// - Variables
const PORT = process.env.PORT || 8080;
// - Routes
const userRoutes = require("./app/routes/userRoutes")
const messageRoutes = require("./app/routes/messageRoutes")
const chatRoutes = require("./app/routes/chatRoutes")
// Imports---------------------------------------------------------------------

// - Express app
const app = express();

// Connections-----------------------------------------------------------------
dbConnection();

// Middlewares-----------------------------------------------------------------
app.use(cors());
app.use(express.json());

// Routes----------------------------------------------------------------------
// Endpoints
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Middlewares-----------------------------------------------------------------
app.use(notFound)
app.use(errorHandler)

// Listener--------------------------------------------------------------------
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
});

// WebSocket-------------------------------------------------------------------
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3001',
    }
});

io.on("connection", (socket) => {
    console.log("New user connected".green.bold);

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        console.log(`User joined room ${room}`);
        socket.join(room);
    })

    socket.on("typing", (room) => { socket.in(room).emit("typing") })
    socket.on("stop typing", (room) => { socket.in(room).emit("stop typing") })

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        console.log("new message received" + chat);

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.off("setup", () => {
        console.log("User Disconnected").red.bold;
        socket.leave(userData._id)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected".red.bold);
    });

})