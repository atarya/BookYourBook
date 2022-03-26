// Loads the configuration from config.env to process.env
require('dotenv').config({ path: '../.env' });

// Imports---------------------------------------------------------------------
// - Packages
const cors = require('cors');
const dbConnection = require('./config/mongo');
const chats = require('./data/chats');
const express = require('express');
const colors = require('colors');
// - Variables
const PORT = process.env.PORT || 8080;
// - Methods
const app = express();
// Imports---------------------------------------------------------------------

// Connections-----------------------------------------------------------------
dbConnection();

// Middlewares-----------------------------------------------------------------
app.use(cors());
app.use(express.json());

// Routes----------------------------------------------------------------------
//Test route
app.get('/', (req, res) => {
    console.log('Server is running');
    res.send("Server is running");
});
// Endpoints
app.use("/user", require("./app/routes/userRoutes"));

// Listener--------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
});