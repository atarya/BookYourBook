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
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
});