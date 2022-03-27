// Environment
require('dotenv').config({ path: '../.env' });

// Imports---------------------------------------------------------------------
// - Packages
const cors = require('cors');
const dbConnection = require('./config/mongo');
const { notFound, errorHandler } = require("./app/middlewares/errorHandler");
const express = require('express');
const colors = require('colors');
// - Variables
const PORT = process.env.PORT || 8080;
// Imports---------------------------------------------------------------------

// - Express app
const app = express();

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

// Middlewares-----------------------------------------------------------------
app.use(notFound)
app.use(errorHandler)

// Listener--------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
});